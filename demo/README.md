# Démo — « Ce que ton appareil révèle »

Une démonstration **interactive et 100 % hors-ligne** qui accompagne le guide Orionix Rempart. Elle te montre concrètement, sur **ton propre** appareil, deux choses que le pistage exploite — puis te renvoie aux documents qui expliquent comment réduire l'exposition.

## Utilisation

Aucune installation, aucun serveur, aucune dépendance. Deux façons de l'ouvrir :

- **Le plus simple** : double-clique sur [`index.html`](index.html). Ça s'ouvre dans ton navigateur.
- **Via un serveur local** (si ton navigateur restreint `file://`) :
  ```sh
  cd demo
  python3 -m http.server 8765
  # puis ouvre http://localhost:8765
  ```

## Ce que la démo fait

1. **Empreinte de navigateur (*fingerprint*)** — affiche les signaux que ton navigateur expose (User-Agent, écran, fuseau, langues, WebGL, empreinte Canvas…) et calcule un hash combiné. Illustre pourquoi la *combinaison* de signaux anodins suffit à te reconnaître sans cookie.
2. **Lecteur + nettoyeur EXIF/GPS** — glisse une photo JPEG : la démo lit ses métadonnées **localement** (date, modèle d'appareil, et surtout **coordonnées GPS** si présentes) et te propose de télécharger une **copie nettoyée** (ré-encodée via canvas, donc débarrassée de toute métadonnée).

## Garanties

- **Zéro réseau** : la page ne fait aucune requête (ni `fetch`, ni `XMLHttpRequest`, ni balise externe, ni police distante). Tout est calculé dans le navigateur. Tu peux le vérifier dans l'onglet « Réseau » des outils de développement.
- **Zéro téléversement** : ta photo ne quitte jamais ton appareil ; elle est lue en mémoire via `FileReader`.
- **Frontière éthique** : la démo n'inspecte que **ton** appareil, à ta demande, et ne cache rien — cohérent avec [`../docs/08`](../docs/08-pourquoi-pas-rootkit.md).

## Limites

C'est un outil **pédagogique**, pas un audit. L'empreinte montrée est indicative ; le nettoyage EXIF par ré-encodage entraîne une légère recompression de l'image. Pour le cadre complet de ce que le stack ne couvre pas, voir [`../docs/07`](../docs/07-ce-que-ce-stack-ne-fait-pas.md).
