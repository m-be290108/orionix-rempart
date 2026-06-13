# Contribuer

Merci de l'intérêt porté à ce dépôt. Les contributions sont les bienvenues **dans la mesure où elles respectent la ligne éthique du projet**, qui n'est pas négociable.

## La règle d'or

> **Tout ce qui se cache du propriétaire de l'appareil est exclu.**

La frontière entre vie privée et logiciel espion est la **transparence vis-à-vis du propriétaire** (voir [`docs/08`](docs/08-pourquoi-pas-rootkit.md)). Une contribution est refusée, sans exception, si elle décrit ou facilite :

- le masquage d'un processus (PID) à l'administrateur/propriétaire ;
- le contournement ou l'interception du contrôle de permissions Android (`checkPermission()` et équivalents) ;
- la désactivation des notifications/indicateurs système pour rendre une activité invisible au propriétaire ;
- le masquage d'une application de la liste des apps installées ;
- le *spoofing* d'IMEI au niveau noyau ou tout identifiant cellulaire ;
- toute capacité d'interception, de surveillance ou d'accès **sur l'appareil d'un tiers** ou **sans le consentement du propriétaire** ;
- toute capacité offensive (exploitation, contournement d'authentification d'un système tiers).

Si une proposition s'approche de cette ligne, elle doit être **redocumentée en alternative légitime** ou écartée.

## La règle de vérité (truth rule)

Ce dépôt vit de sa **crédibilité factuelle**. Toute contribution qui cite un outil ou un fait doit :

1. **Citer une source officielle vérifiable** (URL) pour chaque outil mentionné.
2. **Dater** les versions et l'état de maintenance (« au JJ mois AAAA »).
3. **Ne jamais inventer** de chiffre, de date, de peine légale ou de version. En cas de doute, vérifier ou s'abstenir.
4. Pour les références juridiques : citer l'**article exact** et l'**URL Légifrance**, avec la date de consultation. Pas de jurisprudence inventée.
5. **Ne jamais promettre l'anonymat ou l'intraçabilité** — y compris dans les titres de fichiers, de sections et de scénarios.

## Style

- Français, ton « engineering memo » : prose dense, exemples copiables, pas de marketing.
- Chaque document commence par un **front-matter** : `Niveau · Réversible ? · Prérequis · Temps estimé`.
- Les limites d'une brique doivent être documentées **aussi précisément** que ses bénéfices.
- Les scripts `.sh` : `#!/usr/bin/env bash`, `set -euo pipefail`, vérification des dépendances, non destructifs, commentés, idempotents.

## Processus

1. Ouvre d'abord une *issue* décrivant la contribution et en quoi elle respecte les deux règles ci-dessus.
2. Propose une *pull request* atomique (un sujet par PR).
3. Attends une relecture portant explicitement sur : la ligne éthique, la truth rule, l'exactitude des sources.

Les contributions qui franchissent la ligne éthique ne seront pas fusionnées, quelle que soit leur qualité technique.
