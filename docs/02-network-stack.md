# 02 — Stack réseau : pare-feu par application + DNS filtrant

> **Niveau :** intermédiaire · **Réversible ?** oui (désinstallation simple) · **Prérequis :** [00](00-threat-model.md), un appareil Android (idéalement [01 GrapheneOS](01-grapheneos-install.md)) · **Temps estimé :** 45 min

Cette brique attaque deux adversaires : les **applications qui parlent au réseau sans raison** (télémétrie, pistage) et le **fournisseur d'accès / résolveur DNS** qui voit en clair les noms de domaine que tu visites.

## ⚠️ Contrainte fondamentale : un seul `VpnService` à la fois

Android n'autorise **qu'une seule application VPN active** simultanément (l'API s'appelle `VpnService`). Or, sur Android sans root, **tous** ces outils passent par cette même API pour filtrer le trafic, même quand ils ne sont pas de « vrais » VPN :

- **NetGuard** (pare-feu par app) → occupe le slot VPN local.
- **RethinkDNS** (DNS + pare-feu + WireGuard) → occupe le slot VPN local.
- **Orbot** (Tor) → occupe le slot VPN local en mode « VPN ».
- **Mullvad** (VPN tunnel) → occupe le slot VPN.

**Conséquence directe : tu ne peux pas empiler naïvement deux de ces outils.** Il faut en choisir un comme **couche maîtresse** qui héberge les autres, ou les router entre eux.

### Combinaisons valides vs invalides

| Combinaison | Valide ? | Comment |
|---|---|---|
| RethinkDNS seul (DNS + pare-feu) | ✅ | Couche maîtresse recommandée |
| RethinkDNS + Mullvad (via WireGuard dans RethinkDNS) | ✅ | RethinkDNS importe la config WireGuard de Mullvad |
| RethinkDNS + Orbot (RethinkDNS route vers le proxy Orbot) | ✅ | Orbot en mode proxy, RethinkDNS occupe le slot |
| NetGuard seul | ✅ | Alternative simple |
| **NetGuard + RethinkDNS** | ❌ | Les deux veulent le slot VPN — incompatibles |
| **Orbot (mode VPN) + Mullvad (app)** | ❌ | Deux slots VPN — impossible |

> Pour faire tourner réellement **deux** « VPN » indépendants, la seule voie propre sur Android est le **profil professionnel** (*work profile*) : un VPN dans le profil principal, un autre dans le profil pro. C'est une configuration avancée, rarement nécessaire.

## Couche maîtresse recommandée : RethinkDNS

[RethinkDNS](https://rethinkdns.com) (code : <https://github.com/celzero/rethink-app>, licence Apache-2.0) combine en une seule app :

- un **pare-feu par application** (bloquer le réseau, le Wi-Fi ou les données mobiles app par app) ;
- un **résolveur DNS chiffré** (DoH/DoT) avec **listes de blocage** (pistage, publicité, logiciels malveillants) ;
- la possibilité d'**héberger un tunnel WireGuard** (donc Mullvad) ou de **router vers Orbot**.

C'est pour cette polyvalence qu'il est retenu comme couche maîtresse : il occupe le slot VPN unique tout en laissant la porte aux autres briques (03).

> ⚠️ RethinkDNS publie sur un canal à évolution rapide (versions fréquentes, parfois « alpha »). Installe depuis le Play Store, F-Droid ou les *releases* GitHub officielles, et vérifie le numéro de version au moment où tu lis.

### Mise en route minimale

1. Installer RethinkDNS depuis une source officielle.
2. Activer le **DNS chiffré** (choisir un résolveur DoH de confiance) et au moins une **liste de blocage** anti-pistage.
3. Passer en revue le **pare-feu par app** : couper le réseau aux applications qui n'ont aucune raison d'y accéder (lampe torche, galerie, etc.).
4. Vérifier qu'aucune fuite DNS ne subsiste (RethinkDNS journalise les requêtes ; observe quelques minutes).

## Alternative simple : NetGuard

[NetGuard](https://github.com/M66B/NetGuard) (licence GPLv3, par M66B) est un **pare-feu par application sans root**, plus léger et plus simple que RethinkDNS. Disponible sur [F-Droid](https://f-droid.org/packages/eu.faircode.netguard/). Version 2.335 au 11 juin 2026, projet **maintenu mais sans nouvelles fonctionnalités** (« no new features ») d'après son auteur — ce qui en fait un choix stable, pas un choix de tête.

Limites à connaître :

- En mode filtrage applicatif avancé (inspection du trafic), NetGuard peut laisser **fuir certains paquets UDP** dans des configurations particulières ; ne le considère pas comme un filtre étanche.
- NetGuard et RethinkDNS sont **mutuellement exclusifs** (slot VPN unique). Choisis l'un **ou** l'autre.

Prends NetGuard si tu veux seulement un pare-feu par app, simple et éprouvé. Prends RethinkDNS si tu veux DNS filtrant + pare-feu + intégration VPN/Tor.

## Bootstrap de règles

Le script [`scripts/netguard-rules-bootstrap.sh`](../scripts/netguard-rules-bootstrap.sh) génère un **point de départ** de règles minimales pour NetGuard. **Ce n'est ni exhaustif ni une garantie de blocage** : c'est une base à réviser selon tes applications. Le blocage réel dépend de ta liste d'apps et de tes usages.

## Ce que cette brique ne fait pas

- Elle ne cache **pas** ton adresse IP à la destination (c'est le rôle du [03 — VPN/Tor](03-resistance-correlation.md)).
- Le DNS chiffré empêche ton FAI de **lire** tes requêtes DNS, mais l'**indication du nom de serveur** (SNI) et l'adresse IP de destination peuvent encore révéler les sites visités tant que tu n'ajoutes pas un tunnel (03).
- Un pare-feu par app réduit la télémétrie, il ne neutralise pas une app réellement malveillante déjà installée.
