# 03 — Résistance à la corrélation : Tor et VPN

> **Niveau :** avancé · **Réversible ?** oui · **Prérequis :** [00](00-threat-model.md), [02](02-network-stack.md), et **avoir lu [07](07-ce-que-ce-stack-ne-fait-pas.md)** · **Temps estimé :** 30 min de lecture + mise en place

Ce document ne parle **pas** d'anonymat. Il parle de **résistance à la corrélation** : rendre plus coûteux le recoupement de ton adresse IP avec ton activité. La nuance est capitale et elle est dans le titre du fichier exprès — **rien ici ne te rend « intraçable »**.

## Les deux outils et ce qu'ils font vraiment

### Tor (via Orbot)

[Tor](https://www.torproject.org) fait transiter ton trafic par trois relais successifs : ni le premier ni le dernier ne connaissent à la fois ton identité et ta destination. Sur Android, on l'utilise via **Orbot** (Guardian Project).

- Code officiel : <https://github.com/guardianproject/orbot-android>
- Installe la version **stable** depuis le Play Store, F-Droid ou <https://orbot.app> / torproject.org. ⚠️ Au 11 juin 2026, la dernière *release* publiée sur GitHub est une **bêta** (`17.9.4-BETA`) ; pour un usage sérieux, prends le canal stable des magasins officiels plutôt qu'un tag bêta.

Ce que Tor protège bien : dissimuler ton adresse IP réelle à la destination, contourner certaines censures.
Ce que Tor ne protège pas : un **nœud de sortie** malveillant voit le trafic non chiffré (utilise toujours HTTPS) ; le *fingerprinting* du navigateur peut te réidentifier ; un **adversaire global** qui observe l'entrée et la sortie peut corréler.

### VPN (Mullvad)

Un VPN remplace ton FAI comme témoin de ton trafic : le FAI ne voit plus que « tu parles à un VPN ». **Mais le fournisseur VPN, lui, voit ton trafic IP.** Tu déplaces la confiance, tu ne la supprimes pas.

[Mullvad](https://mullvad.net) est retenu pour des raisons **factuelles et vérifiables**, pas marketing :

- Politique **« no-log » déclarée** — c'est une *politique*, pas une garantie technique absolue ; on ne peut pas prouver une absence de journaux de l'extérieur.
- **Audits indépendants publiés et datés** : voir l'index officiel <https://mullvad.net/en/blog/tag/audits> (ex. audits par Cure53, NCC Group, Assured/GotaTun). Lis les rapports et leurs dates plutôt que de te fier à un slogan.
- Paiement possible sans compte nominatif (numéro de compte aléatoire).

Sur Android, intègre Mullvad de préférence via **WireGuard dans RethinkDNS** (voir [02](02-network-stack.md)) pour respecter la contrainte du slot VPN unique.

## Tor seul / Mullvad seul / pourquoi pas les deux par défaut

| Situation | Choix | Raison |
|---|---|---|
| Tu veux cacher ton IP à des sites web sensibles | **Tor** | Pas de tiers de confiance unique ; mais plus lent, certains sites bloquent Tor |
| Tu veux soustraire l'ensemble de ton trafic à ton FAI | **Mullvad** | Rapide, stable ; mais le VPN devient le témoin |
| Wi-Fi public hostile, usage courant | **Mullvad** | Chiffre tout le trafic local simplement |
| Anonymat fort vis-à-vis d'un site précis | **Tor** | Conçu pour ça |

**Empiler Tor sur Mullvad (ou l'inverse) n'est pas un « 2× mieux ».** Les compromis sont non triviaux : la latence se cumule, et selon l'ordre (« Tor over VPN » vs « VPN over Tor ») tu changes *qui voit quoi*, parfois en aggravant ta situation. Pour la grande majorité des modèles de menace de ce dépôt, **un seul des deux, bien configuré, suffit**. Ne combine que si tu sais précisément quel maillon tu cherches à protéger et pourquoi.

## Quand Tor est bloqué : les ponts

Si Tor est filtré sur ton réseau, utilise un **pont** (*bridge*) : un point d'entrée non listé publiquement. Deux mécanismes courants — **Snowflake** et **obfs4** — sont décrits dans [`examples/tor-bridge-setup.md`](../examples/tor-bridge-setup.md).

## Rappel honnête

Aucune de ces briques ne te rend anonyme face à un adversaire qui peut **te localiser par le réseau cellulaire**, **corréler entrée et sortie**, ou **exploiter ton appareil**. Relis [07](07-ce-que-ce-stack-ne-fait-pas.md). Le mot « intraçable » n'apparaît nulle part dans ce dépôt parce qu'il serait faux.
