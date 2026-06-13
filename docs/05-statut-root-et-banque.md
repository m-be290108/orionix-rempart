# 05 — Statut root et applications de détection (Magisk + Shamiko)

> **Niveau :** avancé · **Réversible ?** difficilement — le déverrouillage du bootloader **efface l'appareil**, casse les mises à jour automatiques (OTA) et peut annuler la garantie · **Prérequis :** [01](01-grapheneos-install.md), **et avoir lu [07](07-ce-que-ce-stack-ne-fait-pas.md) ET [08](08-pourquoi-pas-rootkit.md)** · **Temps estimé :** lecture obligatoire avant toute action

## Tu n'as probablement pas besoin de ce document

Pour le modèle de menace de ce dépôt (profilage, pistage, apps abusives), **le root n'apporte rien et coûte beaucoup** : il affaiblit le *verified boot*, complique les mises à jour de sécurité, et t'expose à de nouveaux risques. La voie par défaut recommandée reste un Pixel **re-verrouillé sans root** ([01](01-grapheneos-install.md)).

Ce document existe pour un cas précis et limité, et pour **expliquer honnêtement où passe la frontière légale et éthique**. Si tu n'es pas certain d'en avoir besoin, ferme-le.

## L'encadré frontière : le seul cas légitime traité ici

> **Cas légitime :** le **propriétaire** d'un appareil qu'il contrôle entièrement choisit de masquer le **statut root** à une application **qu'il a lui-même installée**, parce que cette application refuse de fonctionner sur un appareil rooté (cas typique : certaines applications bancaires).
>
> **Hors périmètre, exclu, et potentiellement pénal :** utiliser ces mêmes outils pour tromper un système **dont tu n'es pas l'utilisateur légitime**, ou sur un appareil **qui ne t'appartient pas / sans le consentement de son propriétaire**. Le même outil, employé sur le téléphone d'autrui à son insu, devient du **logiciel espion** — réprimé par les articles 226-1, 226-15 et 323-3-1 du Code pénal (voir [08](08-pourquoi-pas-rootkit.md)).

La différence n'est pas dans l'outil. Elle est dans **qui est le propriétaire** et dans **la transparence** : ici, tout reste visible et pilotable par le propriétaire via l'interface Magisk. Rien ne se cache de **toi**.

## Ce dont on parle techniquement

- **[Magisk](https://github.com/topjohnwu/Magisk)** (par topjohnwu, version 30.7 au 11 juin 2026, projet actif) : un gestionnaire de root « systemless ». Il fournit une **interface** où le propriétaire voit et contrôle tout : quelles apps ont le root, quelles apps figurent dans la **liste de refus** (*DenyList*).
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases/tag/shamiko-414)** : un module qui renforce le masquage du statut root **vis-à-vis des applications listées par le propriétaire dans la DenyList**. Dernière version **v1.2.5, publiée le 18 juin 2025** (tag `shamiko-414`). ⚠️ **Environ un an sans nouvelle version au 11 juin 2026** : ne le présente pas comme « activement maintenu » sans réserve, et **vérifie sa compatibilité avec ta version de Magisk** avant de l'utiliser.

Le point clé : Shamiko ne cache rien **au propriétaire**. Il cache le statut root à des applications **que le propriétaire désigne lui-même**. C'est l'inverse exact d'un logiciel espion, qui se cache du propriétaire.

## Encadré juridique et contractuel

- **Transparence vis-à-vis du propriétaire ≠ licéité vis-à-vis d'un tiers.** Masquer le root à ton app bancaire **viole presque toujours les conditions générales** de la banque. Tu engages ta **responsabilité contractuelle** : en cas d'incident, la banque peut t'opposer cette violation. **Déconseillé sur des comptes réels** ; à réserver, le cas échéant, à des comptes de test.
- Contourner une détection root **n'autorise aucun accès frauduleux** : si tu t'en sers pour accéder à un système auquel tu n'as pas droit, tu tombes sous l'article 323-1 (accès frauduleux à un STAD). Ce document ne couvre **que** le cas du propriétaire sur son propre appareil et ses propres comptes.

## Aucune garantie de résultat

Le masquage du statut root **ne garantit pas** de passer les vérifications modernes. Beaucoup d'applications utilisent désormais **Play Integrity** avec **attestation matérielle forte** (ancrée dans le composant sécurisé du téléphone) : dans ce cas, un appareil au bootloader déverrouillé est détectable **quoi que tu fasses au niveau logiciel**. Ne compte pas sur Shamiko pour franchir ce mur.

## Coûts à accepter avant de rooter

- **Effacement complet** de l'appareil au déverrouillage du bootloader (irréversible pour les données).
- **Incompatible** avec le re-verrouillage + attestation forte décrit en [01](01-grapheneos-install.md) : tu renonces à une partie du *verified boot*.
- **Mises à jour OTA** souvent cassées ou compliquées (chaque mise à jour peut nécessiter de re-flasher Magisk).
- **Garantie constructeur** potentiellement perdue.
- Surface d'attaque **augmentée** : un root mal géré est une aubaine pour une app malveillante.

## Ce n'est pas un rootkit

Pour être explicite : ce document ne décrit **pas** un rootkit. Un rootkit se cache de l'administrateur/propriétaire du système. Ici, Magisk **expose** tout au propriétaire dans son interface ; le propriétaire décide, voit et révoque. La capacité décrite est une **configuration défensive du propriétaire sur sa propre machine**, pas une dissimulation à son encontre.

> Phrase miroir, à garder en tête : **le même outil installé sur l'appareil d'une autre personne, sans son consentement, est du stalkerware** — et relève de la répression pénale décrite en [08](08-pourquoi-pas-rootkit.md). La frontière, encore une fois, c'est le consentement et la transparence du propriétaire.
