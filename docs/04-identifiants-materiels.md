# 04 — Identifiants matériels et système

> **Niveau :** intermédiaire · **Réversible ?** oui (réglages natifs) · **Prérequis :** [00](00-threat-model.md) · **Temps estimé :** 30 min

Cette brique réduit les **identifiants persistants** qui permettent de te suivre d'un réseau à l'autre ou d'une app à l'autre. **Tout ce qui suit est natif à Android et entièrement visible du propriétaire** — aucun masquage, aucun *spoofing* clandestin, aucune intervention au niveau noyau.

## Adresse MAC : randomisation par réseau

Ton adresse MAC Wi-Fi est un identifiant unique de ta carte réseau. Sans précaution, elle permet de te reconnaître sur chaque réseau Wi-Fi que tu approches (et d'être suivi par les bornes commerciales qui pistent les MAC).

Android randomise la MAC depuis la version 10, mais il faut comprendre **deux modes** :

- **MAC aléatoire persistante (par SSID)** : une MAC aléatoire stable, **différente pour chaque réseau** mais **constante dans le temps pour un même réseau**. C'est le défaut depuis Android 10. ⚠️ Elle reste **corrélable dans la durée** : le même réseau te reverra avec la même MAC à chaque visite.
- **MAC aléatoire non persistante** (Android 12+) : la MAC change périodiquement même pour un réseau connu. **Préfère ce mode pour les réseaux jetables** (cafés, hôtels, lieux publics) afin d'éviter le suivi répété.

Réglage : `Paramètres → Réseau & Internet → Wi-Fi → (réseau) → Confidentialité → MAC aléatoire (non persistante)`.

> Sur GrapheneOS, la randomisation MAC est plus agressive (par connexion par défaut). Vérifie le comportement exact sur la page des fonctionnalités : <https://grapheneos.org/features>.

## Identifiant publicitaire (Advertising ID)

L'identifiant publicitaire est un identifiant réinitialisable que les régies utilisent pour te profiler entre applications. Depuis Android 12, tu peux le **supprimer** (et non plus seulement le réinitialiser) : il est alors remplacé par une chaîne de zéros, ce qui neutralise le pistage inter-apps fondé dessus.

Réglage : `Paramètres → Sécurité & confidentialité → Confidentialité → Annonces → Supprimer l'identifiant publicitaire`.

Sur GrapheneOS sans services Google, ce dispositif n'existe tout simplement pas par défaut.

## Stockage cloisonné (*scoped storage*)

Depuis Android 10/11, les applications n'ont plus accès à l'ensemble du stockage : elles travaillent dans leur propre espace et doivent **demander** l'accès à des fichiers précis. Conséquence pratique : n'accorde l'accès « tous les fichiers » qu'aux applications qui en ont une vraie raison (gestionnaire de fichiers), et révoque-le partout ailleurs.

## Bac à sable des applications

Chaque application Android tourne dans un **bac à sable** (utilisateur Linux isolé). C'est la base du modèle de sécurité. Ce qui le renforce, côté propriétaire :

- Accorder les permissions **au cas par cas** et **temporairement** quand c'est proposé (localisation « seulement cette fois »).
- Utiliser des **profils** distincts pour cloisonner des univers d'applications (voir [01](01-grapheneos-install.md)).
- Sur GrapheneOS, exploiter les permissions supplémentaires (**accès réseau**, **capteurs**) pour priver une app curieuse de ce dont elle n'a pas besoin.

## Ce que cette brique ne fait pas

- Elle ne change **pas** ton IMEI ni l'identité que voit l'opérateur mobile : la randomisation MAC concerne le Wi-Fi, pas le réseau cellulaire. **Spoofer l'IMEI au niveau noyau est hors périmètre** (illégal dans plusieurs pays, et c'est exactement le type de dissimulation que ce dépôt exclut).
- Elle ne supprime pas le *fingerprinting* logiciel (combinaison version OS + modèle + réglages) qu'un site peut tenter ; elle réduit seulement les identifiants explicites et persistants.
