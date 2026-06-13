# 00 — Modèle de menace

> **Niveau :** fondations · **Réversible ?** lecture seule · **Prérequis :** aucun · **Temps estimé :** 15 min

Avant d'installer quoi que ce soit, il faut répondre à une question : **contre qui (ou contre quoi) te protèges-tu ?** Un stack monté sans modèle de menace produit une fausse confiance — le pire résultat possible en sécurité. Ce document pose le vocabulaire réutilisé partout dans le dépôt et trace ce qui est dans le périmètre et ce qui n'y est pas.

## Vocabulaire

- **Adversaire** : l'entité dont tu veux limiter la capacité à te pister, te profiler ou t'identifier. Différents adversaires appellent différentes briques.
- **Empreinte (footprint)** : l'ensemble des signaux que ton appareil émet et qui permettent de te suivre ou de te reconnaître (adresse MAC, identifiants publicitaires, requêtes DNS, adresse IP, métadonnées de fichiers…).
- **Corrélation** : recouper plusieurs signaux faibles pour reconstruire une identité ou un parcours. La plupart des attaques de pistage réelles sont des attaques de corrélation, pas du « cassage » de chiffrement.
- **Réduction d'empreinte** : objectif réaliste de ce dépôt. On ne te rend pas invisible ; on diminue la quantité et la qualité des signaux exploitables.
- **Transparence-propriétaire** : principe éthique du dépôt — toute technique reste visible et contrôlable par la personne qui détient l'appareil. C'est la frontière avec le logiciel espion.

## Les adversaires que ce stack prend au sérieux

| Adversaire | Ce qu'il veut | Brique principale |
|---|---|---|
| **Régies publicitaires / courtiers en données** | Profilage commercial, identifiants persistants, suivi inter-apps | [04 identifiants](04-identifiants-materiels.md), [02 DNS/firewall](02-network-stack.md) |
| **Fournisseur d'accès / opérateur (pour le contenu)** | Journalisation des sites visités, revente de métadonnées | [02 DNS chiffré](02-network-stack.md), [03 VPN/Tor](03-resistance-correlation.md) |
| **Réseau Wi-Fi public hostile** | Interception, captation, injection | [02](02-network-stack.md), [03](03-resistance-correlation.md), [04 MAC](04-identifiants-materiels.md) |
| **Applications abusives standard** | Permissions excessives, télémétrie, pistage en arrière-plan | [01 GrapheneOS sandbox](01-grapheneos-install.md), [02 firewall par app](02-network-stack.md) |

Pour chacun, le dépôt explique **quelle combinaison de briques** répond, et à quel prix (confort, compatibilité, performances).

## Ce qui reste hors de portée — et pourquoi

Ces menaces ne sont **pas** couvertes par ce stack. Le prétendre serait malhonnête et dangereux. Le détail est dans [07 — Ce que ce stack ne fait PAS](07-ce-que-ce-stack-ne-fait-pas.md).

- **Logiciels espions de classe étatique (type Pegasus, exploitation 0-clic)** : ils exploitent des vulnérabilités du système ou d'applications avant que tes réglages n'entrent en jeu. GrapheneOS durcit la surface d'attaque mais ne constitue pas une garantie.
- **Attaques sur le *baseband* (modem)** : le processeur radio est un domaine séparé ; ce dépôt ne le traite pas.
- **Opérateur mobile compromis ou réquisitionné** : ta localisation par triangulation cellulaire et tes métadonnées d'appel échappent à un VPN ou à Tor.
- **Saisie physique d'un appareil non chiffré ou déverrouillé** : aucun logiciel ne protège un appareil qu'on te prend allumé et déverrouillé.
- **Corrélation par un adversaire global** : un acteur qui voit simultanément l'entrée et la sortie d'un réseau d'anonymisation peut, en théorie, te désanonymiser.

## Comment te servir de ce modèle

1. Liste **tes** adversaires réels (pas les plus impressionnants — les plus probables).
2. Pour chacun, identifie la ou les briques pertinentes ci-dessus.
3. Note ce que tu acceptes de perdre en confort. Un stack qu'on désactive « parce que c'est pénible » ne protège personne.
4. Relis [07](07-ce-que-ce-stack-ne-fait-pas.md) pour calibrer tes attentes.

Un gabarit pour formaliser ton propre modèle de menace est fourni dans [`examples/threat-model-template.md`](../examples/threat-model-template.md). Un arbre de décision « par où commencer » est dans [`examples/decision-tree.mermaid`](../examples/decision-tree.mermaid).

## Parcours de lecture

```
00 (ici)  →  01 (GrapheneOS)  →  02 (réseau)  →  04 (identifiants)  →  07 (limites)
```

Briques avancées, à n'aborder qu'après 07 et 08 : [03 (corrélation)](03-resistance-correlation.md) et [05 (root & banque)](05-statut-root-et-banque.md). Les [scénarios pratiques (06)](06-scenarios-pratiques.md) se lisent une fois les briques de base en place.
