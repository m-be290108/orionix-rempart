# 09 — Note sur iOS : pourquoi il est hors périmètre

> **Niveau :** tous · **Réversible ?** lecture seule · **Prérequis :** [00](00-threat-model.md) · **Temps estimé :** 10 min

Ce dépôt traite **Android**. iOS n'est pas couvert — non par préférence, mais parce que **le modèle de sécurité d'Apple ne laisse pas la place aux leviers sur lesquels repose tout ce guide**. Cette note explique honnêtement pourquoi, et ce qui reste réellement faisable côté iOS.

## La raison de fond : qui détient le contrôle

La philosophie d'Orionix Rempart est : **tu reprends le contrôle de ton appareil**. Sur Android (et surtout via GrapheneOS), c'est possible parce que le propriétaire peut déverrouiller le bootloader, installer une ROM durcie, choisir un pare-feu par application, et décider finement des permissions.

Sur iOS, **c'est Apple qui fixe le périmètre du possible**. Le modèle est « jardin clos » : très protecteur par défaut contre les applications tierces, mais il **t'interdit aussi** la plupart des actions de souveraineté avancée. Tu ne reprends pas le contrôle — tu fais confiance aux réglages qu'Apple veut bien t'ouvrir.

## Ce qui rend le stack Android intransposable

| Brique du dépôt | Sur iOS |
|---|---|
| ROM alternative durcie (GrapheneOS) | **Impossible.** Bootloader verrouillé, aucune ROM tierce ne peut s'installer. |
| Root contrôlé et transparent (Magisk/Shamiko, doc [05](05-statut-root-et-banque.md)) | **Pas d'équivalent.** Le *jailbreak* est une autre logique : fragile, vite obsolète, et il **affaiblit** la sécurité au lieu de la renforcer. Ce dépôt ne le recommande pas. |
| Pare-feu par application via `VpnService` (NetGuard / RethinkDNS, doc [02](02-network-stack.md)) | **Très limité.** iOS encadre fortement ce qu'une app « VPN » peut filtrer ; pas de pare-feu par app comparable. |
| Permissions réseau/capteurs fines par app (doc [01](01-grapheneos-install.md)) | **Partiel.** Réglages plus grossiers, sous le contrôle d'Apple. |

## Ce qui reste réellement faisable sur iOS (honnête, mais limité)

Si tu es sur iOS, voici les mesures **réelles** — toutes via les réglages Apple, donc dans les limites qu'Apple t'accorde :

- **Mode Isolement / Lockdown Mode** (introduit avec iOS 16) : réduit drastiquement la surface d'attaque (pièces jointes, navigation, connexions) pour les profils à haut risque. C'est la mesure la plus forte d'iOS, mais elle **dégrade le confort** d'usage.
- **Transparence du suivi des apps (App Tracking Transparency)** : refuse le suivi inter-apps app par app ; neutralise l'identifiant publicitaire (IDFA) pour celles que tu bloques.
- **DNS chiffré** : tu peux installer un profil de configuration DNS (DoH/DoT) ou une app dédiée pour chiffrer tes requêtes DNS — équivalent partiel du doc [02](02-network-stack.md).
- **Relais privé iCloud (iCloud Private Relay)** : masque ton adresse IP **pour le trafic Safari** (nécessite un abonnement iCloud+). Ce **n'est pas** un VPN complet et ne couvre pas tout le trafic.
- **Protection avancée des données (Advanced Data Protection)** : étend le chiffrement de bout en bout à davantage de catégories iCloud.
- **VPN tiers de confiance** (ex. Mullvad, doc [03](03-resistance-correlation.md)) : disponible sur iOS et utile pour le trafic réseau, avec les mêmes réserves (le fournisseur VPN voit ton trafic).
- **Hygiène de base** : permissions au plus juste, désactivation de la localisation en arrière-plan, suppression des apps invasives.

## Les limites, sans détour

- Tu ne peux **pas** retirer le système d'exploitation du constructeur ni les services intégrés de la même manière que sur un Android dégooglisé.
- Un « guide souveraineté iOS » se résumerait largement à **« configure correctement les options d'Apple et fais-lui confiance »** — l'inverse de la démarche de ce dépôt.
- iOS reste, pour beaucoup d'utilisateurs, **un bon choix par défaut** grâce à son durcissement natif et à ses mises à jour longues. Mais ce n'est pas un terrain de **souveraineté** au sens où ce dépôt l'entend.
- Les menaces hors périmètre du doc [07](07-ce-que-ce-stack-ne-fait-pas.md) (classe étatique, baseband, opérateur, saisie physique) **valent aussi pour iOS** : aucun réglage Apple ne les neutralise.

## En résumé

iOS n'est pas dans Orionix Rempart parce que **la souveraineté qu'il décrit y est structurellement impossible**. Si tu tiens à reprendre la main sur ton appareil mobile, c'est un **Pixel sous GrapheneOS** ([01](01-grapheneos-install.md)) qui ouvre cette porte — pas iOS. Si tu restes sur iOS, applique les mesures ci-dessus en sachant exactement ce qu'elles couvrent, et ce qu'elles ne couvrent pas.
