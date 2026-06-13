# 01 — Installer GrapheneOS

> **Niveau :** débutant motivé · **Réversible ?** partiellement (le déverrouillage du bootloader efface l'appareil ; re-verrouiller est possible) · **Prérequis :** un Pixel compatible, un ordinateur, un câble USB-C de données · **Temps estimé :** 1 h

GrapheneOS est une variante durcie d'Android, sans services Google par défaut, qui ajoute un bac à sable d'applications, un pare-feu réseau intégré et de nombreuses protections mémoire. Elle ne fonctionne **que sur les appareils Pixel**, parce que ce sont les seuls grand public à offrir un *verified boot* avec re-verrouillage du bootloader sur une clé tierce.

## Pourquoi GrapheneOS plutôt qu'une autre ROM

Le tableau ci-dessous ne compare que des **critères factuels et vérifiables**. Il évite tout jugement de valeur non sourçable. Vérifie chaque ligne sur les sites officiels avant de décider.

| Critère | GrapheneOS | CalyxOS | /e/OS | LineageOS |
|---|---|---|---|---|
| Re-verrouillage du bootloader (*verified boot* sur clé du projet) | Oui | Oui (Pixel) | Variable selon l'appareil | Non sur la plupart des appareils |
| Bac à sable pour les services Google (Play en *sandbox*, non privilégié) | Oui | Oui (via microG en option) | microG intégré | Non (à installer soi-même) |
| Appareils visés | Pixel uniquement | Pixel (+ qqs autres) | Large catalogue | Très large catalogue |
| Modèle de financement | Dons / association | Association (Calyx Institute) | Fondation / offre commerciale | Communautaire |

> Remarques de fraîcheur : LineageOS, sur la plupart des appareils, ne permet pas de re-verrouiller le bootloader — l'écran d'avertissement « bootloader déverrouillé » reste affiché et le *verified boot* tiers n'est pas assuré. Le périmètre exact de CalyxOS et de /e/OS évolue ; reporte-toi à leurs pages officielles.

Pour le modèle de menace de ce dépôt (profilage commercial, apps abusives), GrapheneOS offre la combinaison la plus complète : re-verrouillage + Play en bac à sable + pare-feu réseau natif.

- Site officiel : <https://grapheneos.org>
- Liste des appareils et des versions : <https://grapheneos.org/releases>
- Au 11 juin 2026, la dernière version stable publiée est `2026060600`, disponible du **Pixel 6** au **Pixel 10a**. **Ne fige pas un numéro de build** : les versions sortent à un rythme quasi hebdomadaire ; prends toujours la plus récente depuis la page officielle.

## Choisir l'appareil

N'importe quel Pixel pris en charge convient. Plus l'appareil est récent, plus longtemps il recevra des mises à jour de sécurité (le calendrier de support est indiqué par Google et relayé par GrapheneOS). Achète de préférence neuf ou auprès d'une source de confiance : un appareil d'occasion peut avoir un bootloader déjà manipulé.

## Installation : la méthode du *web installer*

GrapheneOS fournit un installateur qui fonctionne directement depuis un navigateur compatible WebUSB (Chromium). C'est la voie recommandée pour la majorité des gens. La procédure de référence, **toujours à suivre depuis la page officielle** (ne copie pas des commandes d'un tiers), est : <https://grapheneos.org/install/web>.

Étapes, dans l'ordre :

1. **Activer le débogage / les options développeur** sur le Pixel, puis autoriser le **déverrouillage OEM** (*OEM unlocking*).
2. **Déverrouiller le bootloader** : `fastboot flashing unlock`. ⚠️ **Cette étape efface entièrement l'appareil.** C'est irréversible pour les données présentes.
3. **Flasher GrapheneOS** via le *web installer* (il télécharge l'image officielle et l'écrit).
4. **Re-verrouiller le bootloader** : `fastboot flashing lock`. Cette étape est **essentielle** : elle active le *verified boot* sur la clé de GrapheneOS et efface à nouveau l'appareil. Sans elle, l'intégrité du démarrage n'est pas garantie.
5. **Désactiver le déverrouillage OEM** une fois re-verrouillé.

```sh
# Vérifie d'abord que l'appareil est bien vu en mode bootloader :
fastboot devices
# Le déverrouillage et le flash suivent la procédure officielle ; ne pas inventer d'options.
```

> Le script [`scripts/verify-grapheneos.sh`](../scripts/verify-grapheneos.sh) **n'installe rien et ne vérifie rien à ta place** : il explique les deux mécanismes réels de vérification (empreinte de l'image *avant* le flash, et attestation *après* l'installation). Lis-le avant de commencer.

## Vérifier que l'installation est authentique

Il faut distinguer deux choses souvent confondues :

1. **L'écran de *verified boot* au démarrage** : après re-verrouillage, le Pixel affiche brièvement un identifiant de clé. C'est un premier signal, mais il ne prouve pas à lui seul l'absence de compromission.
2. **L'attestation matérielle forte** : elle se fait avec l'application **Auditor** (fournie par GrapheneOS). L'auto-attestation locale (l'appareil s'audite lui-même) a une valeur limitée — **un appareil ne peut pas prouver sa propre intégrité de façon fiable s'il est déjà compromis**. Pour une attestation solide, Auditor utilise un **second appareil Android** : tu apparies les deux par QR code, et le second vérifie le premier. Le service <https://attestation.app> peut servir de vérificateur distant, mais il suppose qu'Auditor tourne sur l'appareil audité.

En clair : pour une vérification sérieuse, prévois un **deuxième téléphone**. C'est expliqué en détail dans [`scripts/verify-grapheneos.sh`](../scripts/verify-grapheneos.sh).

## Premier démarrage : réglages d'hygiène

- N'installe **pas** les services Google si tu n'en as pas besoin. Si certaines apps les exigent, installe **Google Play en bac à sable** (proposé par GrapheneOS) : il tourne comme une app ordinaire, sans privilèges système.
- Crée des **profils** séparés (le profil professionnel ou un profil dédié aux apps invasives isole leurs données).
- Passe en revue les **permissions réseau, capteurs et localisation** app par app (GrapheneOS ajoute une permission « accès réseau » et une permission « capteurs » que l'Android standard n'a pas).
- Configure le verrouillage d'écran avec un **code long** (le chiffrement de l'appareil n'a de valeur que si le secret de déverrouillage est fort).

## Note croisée importante

Le re-verrouillage du bootloader avec *verified boot* (ce document) et l'**obtention du root via Magisk** (document [05](05-statut-root-et-banque.md)) sont **mutuellement exclusifs** dans leur forme la plus stricte : rooter suppose de garder une porte ouverte que le re-verrouillage referme. Choisis en conscience. Pour le modèle de menace de ce dépôt, **rester re-verrouillé sans root est le choix par défaut recommandé** ; le root (05) est une brique avancée, optionnelle et à risque.

## Et sur iOS ?

Hors périmètre. iOS a un modèle de sécurité différent (pas de ROM alternative, bac à sable imposé, pas d'équivalent à GrapheneOS). Le « Mode Isolement » (*Lockdown Mode*) d'Apple répond à une autre logique. Ce dépôt traite Android.
