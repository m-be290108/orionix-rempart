# mobile-sovereignty-stack

> Guide d'ingénierie honnête pour **réduire** le pistage et le profilage sur Android, sans jamais construire de rootkit ni de logiciel espion.

---

## English (short)

This repository is a French-language engineering guide to **reducing tracking and commercial profiling on Android** using open-source tools (GrapheneOS, RethinkDNS, NetGuard, Orbot/Tor, Mullvad, Magisk/Shamiko).

**Hard ethical line:** anything that hides from the **owner of the device** is excluded. The boundary between privacy and malware is *full transparency toward the device owner*. No permission hooking, no app hiding, no kernel-level IMEI spoofing, no rootkit.

**No anonymity is promised.** This stack lowers your tracking footprint; it does **not** make you anonymous against a sophisticated or state-level adversary (see [`docs/07`](docs/07-ce-que-ce-stack-ne-fait-pas.md)).

The documentation below is in French.

---

## À quoi sert ce dépôt

Une personne compétente qui veut se protéger contre le **profilage commercial**, le **pistage par son fournisseur d'accès**, les **réseaux Wi-Fi publics** et les **applications abusives** y trouvera une méthode reproductible, fondée sur des outils libres, avec leurs limites documentées aussi précisément que leurs bénéfices.

Ce n'est pas un produit « anti-surveillance totale ». C'est un **stack de réduction d'empreinte**, monté brique par brique, où chaque brique est expliquée, sourcée et bornée.

## La frontière éthique (à lire avant tout)

> **Tout ce qui se cache du propriétaire de l'appareil est exclu de ce dépôt.**

La différence technique entre un outil de vie privée légitime et un logiciel espion (*stalkerware*) ne tient pas à la sophistication, mais à **la transparence vis-à-vis du propriétaire** :

- Un outil légitime peut cacher le statut *root* à une application **que le propriétaire installe lui-même** (par exemple pour des raisons de compatibilité) ; tout reste visible et contrôlable par le propriétaire via une interface (Magisk).
- Un *stalkerware* se cache de la personne qui détient l'appareil. Il intercepte des communications, masque sa propre présence, contourne les notifications système. **En droit français, c'est pénalement réprimé** (voir [`docs/08`](docs/08-pourquoi-pas-rootkit.md)).

Ce dépôt ne fournit **aucune** capacité offensive : pas de masquage de PID, pas de hook de `checkPermission()`, pas de désactivation des notifications système pour soi-même, pas de spoof d'IMEI au niveau noyau, pas de masquage d'application au propriétaire. Si une contribution franchit cette ligne, elle est refusée (voir [`CONTRIBUTING.md`](CONTRIBUTING.md)).

## Modèle de menace en une phrase

**Couvert :** profilage publicitaire, pistage par le FAI, interception sur Wi-Fi public, applications standard trop curieuses.
**Non couvert :** logiciels espions de classe étatique (type Pegasus), attaques sur le *baseband*, opérateur mobile compromis, saisie physique d'un appareil non chiffré.

Le détail est dans [`docs/00-threat-model.md`](docs/00-threat-model.md), et la liste précise de ce que le stack **ne fait pas** dans [`docs/07`](docs/07-ce-que-ce-stack-ne-fait-pas.md).

## Parcours de lecture recommandé

```
00 (modèle de menace)  →  01 (GrapheneOS)  →  02 (réseau)  →  04 (identifiants)  →  07 (limites)
                                   ↘ optionnel/avancé : 03 (corrélation), 05 (root & banque) — lire 07 et 08 d'abord
06 (scénarios) une fois les briques en place.
```

| # | Document | Niveau |
|---|---|---|
| 00 | [Modèle de menace](docs/00-threat-model.md) | Fondations |
| 01 | [Installer GrapheneOS](docs/01-grapheneos-install.md) | Débutant motivé |
| 02 | [Stack réseau (firewall + DNS)](docs/02-network-stack.md) | Intermédiaire |
| 03 | [Résistance à la corrélation (Tor + VPN)](docs/03-resistance-correlation.md) | Avancé |
| 04 | [Identifiants matériels](docs/04-identifiants-materiels.md) | Intermédiaire |
| 05 | [Statut root & applications bancaires](docs/05-statut-root-et-banque.md) | Avancé — *lire 07 + 08 d'abord* |
| 06 | [Scénarios pratiques](docs/06-scenarios-pratiques.md) | Tous |
| 07 | [Ce que ce stack ne fait PAS](docs/07-ce-que-ce-stack-ne-fait-pas.md) | **Tous — important** |
| 08 | [Pourquoi pas un rootkit (éthique + droit)](docs/08-pourquoi-pas-rootkit.md) | Tous |

Annexes : [`scripts/`](scripts/) (utilitaires non destructifs), [`examples/`](examples/) (gabarit de modèle de menace, arbre de décision).

## Pourquoi ce dépôt relève du « motif légitime »

L'article 323-3-1 du Code pénal réprime la mise à disposition, **sans motif légitime**, d'un moyen conçu pour commettre une atteinte à un système de traitement automatisé de données. Ce dépôt reste explicitement du côté légitime :

1. **Finalité défensive et pédagogique** : protéger le propriétaire d'un appareil, pas attaquer autrui.
2. **Transparence totale** : aucune technique décrite ne se cache du propriétaire.
3. **Aucun moyen d'accès frauduleux fourni** : pas de code d'exploitation, pas d'interception, pas de contournement d'authentification d'un système tiers.
4. **Renvoi aux dépôts officiels** : les outils tiers ne sont pas redistribués ; on pointe vers leurs sources officielles.

Le raisonnement complet est dans [`docs/08`](docs/08-pourquoi-pas-rootkit.md).

## Licence

[Apache 2.0](LICENSE) — Copyright 2026 Mathieu Bellot. *(Attribution définitive à confirmer par l'auteur.)*

## Avertissement

Ce dépôt est de la **documentation**. Il ne garantit aucun résultat de sécurité, n'engage pas la responsabilité de ses auteurs, et ne remplace pas un conseil juridique ou un audit professionnel. Les versions d'outils citées sont datées du 11 juin 2026 ; vérifiez les sources officielles avant d'agir.
