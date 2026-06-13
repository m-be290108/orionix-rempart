# 08 — Pourquoi pas un rootkit : la frontière éthique et juridique

> **Niveau :** tous · **Réversible ?** lecture seule · **Prérequis :** aucun · **Temps estimé :** 20 min
>
> ⚠️ **Avertissement :** ce document est une vulgarisation juridique, **pas un avis juridique**. Les références sont datées du 13 juin 2026 et doivent être revérifiées sur Légifrance ; en cas de doute, consulte un professionnel du droit.

Ce dépôt aurait pu être tout autre chose : un guide pour cacher une application, intercepter des messages, masquer un processus, suivre quelqu'un à son insu. Ce choix a été refusé, explicitement. Voici pourquoi, et où passe précisément la ligne.

## Pourquoi ce dépôt relève du « motif légitime » (art. 323-3-1)

L'article 323-3-1 du Code pénal réprime la mise à disposition, **sans motif légitime**, d'un moyen conçu pour commettre une atteinte à un système de traitement automatisé de données. Ce dépôt reste du côté légitime, par construction :

1. **Finalité défensive et pédagogique** : il aide une personne à protéger **son propre** appareil ; il n'aide à attaquer celui de personne.
2. **Transparence totale vis-à-vis du propriétaire** : aucune technique décrite ne se cache de la personne qui détient l'appareil.
3. **Aucun moyen offensif fourni** : pas de code d'exploitation, pas d'outil d'interception, pas de contournement d'authentification d'un système tiers. Les scripts du dépôt sont des **configurations défensives**, non destructives.
4. **Renvoi aux dépôts officiels** : les outils tiers ne sont pas redistribués ; on pointe vers leurs sources officielles.

La « recherche ou la sécurité informatique » est d'ailleurs citée par le texte lui-même comme motif légitime.

## La frontière : la transparence vis-à-vis du propriétaire

La sophistication technique ne distingue **pas** un outil de vie privée d'un logiciel espion. Le même mécanisme (par exemple masquer le statut root) est légitime ou criminel selon **une seule question** :

> **Est-ce que cela se cache du propriétaire de l'appareil ?**

- **Non** → c'est une configuration que le propriétaire applique à sa machine, en conscience. Légitime.
- **Oui** → c'est de la dissimulation à l'encontre de la personne concernée. C'est la définition opérationnelle du **stalkerware**.

Tout ce qui se cache du propriétaire est **exclu** de ce dépôt : masquer un PID à l'administrateur, hooker `checkPermission()` pour contourner le consentement Android, désactiver les notifications système pour rendre une surveillance invisible, masquer une application de la liste des apps installées, *spoofer* l'IMEI au niveau noyau. Ce ne sont pas des « fonctionnalités avancées » : ce sont les briques d'un logiciel espion.

## Pourquoi cacher `checkPermission()` est du stalkerware

Sur Android, le système demande le **consentement** de l'utilisateur pour la localisation, le micro, la caméra, les contacts. Un logiciel qui **intercepte ou contourne** ce contrôle de permission (par exemple en interceptant `checkPermission()` pour accéder au micro sans que l'indicateur s'allume) prive le propriétaire de son consentement éclairé. C'est exactement le comportement qui transforme une app en mouchard. Le dépôt ne décrit aucune technique de ce genre.

## Cadre légal français

> Articles vérifiés sur legifrance.gouv.fr le 13 juin 2026. Les peines évoluent ; revérifie avant de citer.

### Article 226-1 — Atteinte à la vie privée
Capter, enregistrer ou transmettre, sans consentement, les **paroles** prononcées à titre privé, ou l'**image** d'une personne dans un lieu privé.
**Peine : 1 an d'emprisonnement et 45 000 € d'amende.** Portée à **2 ans et 60 000 €** lorsque les faits sont commis par le conjoint, le concubin ou le partenaire de PACS de la victime.
Réf. : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042193566>

### Article 226-15 — Atteinte au secret des correspondances
Intercepter, détourner, utiliser ou divulguer de mauvaise foi des correspondances émises, transmises ou reçues par voie électronique, ou installer des dispositifs conçus pour de telles interceptions.
**Peine : 1 an d'emprisonnement et 45 000 € d'amende.** Portée à **2 ans et 60 000 €** lorsque les faits sont commis par le conjoint, le concubin ou le partenaire de PACS (aggravation introduite par la **loi n° 2020-936 du 30 juillet 2020**, art. 18).
*(Précision : l'amende ne « double » pas — elle passe de 45 000 à 60 000 €.)*
Réf. : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042193573>

### Article 323-1 — Accès ou maintien frauduleux dans un STAD
Accéder ou se maintenir frauduleusement dans tout ou partie d'un système de traitement automatisé de données.
**Peine de base : 3 ans d'emprisonnement et 100 000 € d'amende.** Portée à **5 ans et 150 000 €** en cas de suppression/modification de données ou d'altération du fonctionnement, et à **7 ans et 300 000 €** lorsque le système est un traitement de données personnelles mis en œuvre par l'État. (Version en vigueur, modifiée par la loi n° 2023-22 du 24 janvier 2023.)
Réf. : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047052655>

### Article 323-3-1 — Mise à disposition de moyens
Importer, détenir, offrir, céder ou mettre à disposition, **sans motif légitime (notamment de recherche ou de sécurité informatique)**, un moyen (équipement, programme, données) conçu ou spécialement adapté pour commettre une atteinte des articles 323-1 à 323-3.
**Peine : référentielle** — « puni des peines prévues respectivement pour l'infraction elle-même ou pour l'infraction la plus sévèrement réprimée ». Il n'y a **pas de montant autonome** : la peine renvoie aux articles 323-1 à 323-3. C'est l'article qui vise explicitement les enregistreurs de frappe (*keyloggers*) et les logiciels espions.
Réf. : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028345220>

### Article 222-33-2-2 — Harcèlement (y compris en ligne)
Propos ou comportements répétés dégradant les conditions de vie de la victime.
**Peine de base : 1 an d'emprisonnement et 15 000 € d'amende** (ITT ≤ 8 jours ou nulle). Portée à **2 ans et 30 000 €** en présence d'une circonstance aggravante — **dont le fait que l'infraction soit commise via un service de communication en ligne ou un support numérique** — et à **3 ans et 45 000 €** lorsqu'au moins deux circonstances aggravantes sont réunies.
Réf. : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049312743>

> Note : un même comportement de surveillance clandestine peut **cumuler** plusieurs de ces qualifications (par ex. 226-15 + 323-1 + 323-3-1). L'article 226-2-1 (diffusion d'images à caractère sexuel sans consentement) peut s'ajouter dans certains cas, mais n'est pas le pilier de la répression du stalkerware.

## Dimension RGPD / UE

Le droit pénal n'est pas seul en jeu : le traitement de **données personnelles** est encadré par le **Règlement (UE) 2016/679 (RGPD)** et la **loi n° 78-17 (Informatique et Libertés)**, sous le contrôle de la **CNIL**.

- **Usage strictement personnel du propriétaire sur ses propres données** : en principe **hors champ** du RGPD, au titre de l'**exemption domestique** (art. 2 §2, point c, « activité strictement personnelle ou domestique »). C'est le cadre des briques de ce dépôt.
- **Traiter les données d'un tiers** (suivre, enregistrer, géolocaliser quelqu'un d'autre) **sans base légale** : le traitement devient illicite au sens du RGPD (licéité = **art. 6** ; définitions = **art. 4**), **en plus** des infractions pénales ci-dessus. La dimension RGPD **renforce** donc la thèse anti-stalkerware : surveiller autrui sans consentement est à la fois un délit pénal et un traitement illicite.

## Conclusion

La vie privée se construit **pour soi**, en pleine lumière vis-à-vis de soi-même. La surveillance se construit **contre l'autre**, dans l'ombre. Ce dépôt reste entièrement du premier côté. C'est un choix technique, éthique et juridique — et il est non négociable.
