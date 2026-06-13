# 06 — Scénarios pratiques

> **Niveau :** tous · **Réversible ?** oui · **Prérequis :** avoir mis en place les briques [02](02-network-stack.md) et [04](04-identifiants-materiels.md) au minimum ; [03](03-resistance-correlation.md) pour les scénarios réseau avancés · **Temps estimé :** variable

Recettes combinant les briques précédentes. Chacune renvoie aux documents de référence ; aucune ne promet l'anonymat.

## 1. Wi-Fi public (café, gare, hôtel)

**Menace :** interception sur le réseau local, suivi par adresse MAC, point d'accès malveillant.

1. Active la **MAC aléatoire non persistante** pour ce réseau ([04](04-identifiants-materiels.md)).
2. Active un **tunnel chiffré** : Mullvad via RethinkDNS ([02](02-network-stack.md) + [03](03-resistance-correlation.md)). Tout ton trafic local devient illisible pour le réseau.
3. Garde le **DNS chiffré** actif.
4. Désactive le partage et la reconnexion automatique aux réseaux ouverts connus.

## 2. Voyage international

**Menace :** réseaux inconnus, et **cadres juridiques différents du tien**.

- Applique le scénario Wi-Fi public ci-dessus.
- ⚠️ **Avertissement neutre, sans conseil de contournement :** les obligations légales varient fortement d'un pays à l'autre. Certains États peuvent **exiger le déverrouillage ou le déchiffrement** d'un appareil au passage de la frontière, et l'usage de Tor/VPN y est parfois restreint ou illégal. Renseigne-toi sur le droit **local** avant de partir. Ce dépôt ne fournit aucune technique pour se soustraire à une obligation légale.
- Envisage un appareil de voyage **minimal** (peu de données) plutôt que ton téléphone principal.

## 3. Applications bancaires et appareil durci

**Menace :** l'app bancaire refuse un appareil non standard.

- Sur un Pixel **re-verrouillé sans root** ([01](01-grapheneos-install.md)), la plupart des apps bancaires fonctionnent via **Google Play en bac à sable**.
- Si une app bloque malgré tout, **n'essaie pas de la contourner sur un compte réel** : c'est une violation de ses conditions et un risque pour toi (voir [05](05-statut-root-et-banque.md)). Préfère l'interface web ou un appareil dédié.

## 4. Communication sensible

**Menace :** interception de contenu, métadonnées.

- Utilise une **messagerie chiffrée de bout en bout** réputée (par ex. Signal). Le chiffrement protège le **contenu** ; les **métadonnées** (qui, quand) restent partiellement exposées selon le service.
- Combine avec un tunnel ([03](03-resistance-correlation.md)) pour masquer ton IP au réseau.
- Rappelle-toi que la sécurité d'une conversation dépend **aussi** de l'appareil d'en face.

## 5. Photo sans fuite de localisation

**Menace :** les métadonnées EXIF d'une photo contiennent souvent les **coordonnées GPS** et l'horodatage.

1. Désactive l'**enregistrement de la localisation** dans l'application appareil photo.
2. Avant de partager, **retire les métadonnées EXIF/GPS** : sur GrapheneOS, l'application Appareil photo et le partage proposent une option de suppression des métadonnées ; sinon, utilise un outil local de nettoyage EXIF (hors ligne, pas un service web).
3. Méfie-toi des captures d'écran et des aperçus qui peuvent réintroduire des métadonnées.

## 6. Achat à empreinte réduite

> Titre volontairement prudent : **« empreinte réduite », pas « anonyme »**. Un achat totalement anonyme est hors de portée d'un téléphone, et ce dépôt ne le promet pas.

**Menace :** lier un achat à ton identité civile via les moyens de paiement et le pistage.

- Limite la **télémétrie** du commerçant (pare-feu par app, navigateur cloisonné).
- Privilégie, **dans le respect de la loi**, des moyens de paiement qui n'exposent pas inutilement ton identité (par ex. cartes prépayées légales selon ta juridiction).
- Comprends la limite : le **transporteur**, l'**adresse de livraison** et le **moyen de paiement** restent des points d'identification que la technique ne supprime pas.

---

Pour t'orienter selon **ton** adversaire principal, vois l'arbre de décision : [`examples/decision-tree.mermaid`](../examples/decision-tree.mermaid).
