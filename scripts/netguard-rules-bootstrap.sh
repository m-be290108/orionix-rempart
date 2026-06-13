#!/usr/bin/env bash
#
# netguard-rules-bootstrap.sh
#
# Génère un POINT DE DÉPART minimal de réflexion sur les règles de pare-feu
# par application, au format lisible, pour t'aider à configurer NetGuard.
#
# AVERTISSEMENT : ce set est NON EXHAUSTIF et n'est PAS une garantie de blocage.
# C'est une base à RÉVISER selon TES applications et TES usages. Le blocage réel
# dépend de ta liste d'apps installées. NetGuard se configure dans son interface ;
# ce script ne pousse aucune règle sur l'appareil — il imprime un modèle.
#
# Référence : https://github.com/M66B/NetGuard
#             https://f-droid.org/packages/eu.faircode.netguard/
#             Version de référence : NetGuard 2.335 (au 11 juin 2026).
#
# Licence : Apache-2.0. Non destructif. N'accède à aucun appareil.

set -euo pipefail

OUT="${1:-netguard-bootstrap-rules.txt}"

if [ -e "$OUT" ]; then
  printf 'Le fichier "%s" existe déjà. Choisis un autre nom : %s <fichier>\n' "$OUT" "$0" >&2
  exit 1
fi

cat > "$OUT" <<'EOF'
# ---------------------------------------------------------------------------
# NetGuard — modèle de règles de DÉPART (à réviser, non exhaustif)
# ---------------------------------------------------------------------------
# Principe : par défaut, on REFUSE l'accès réseau, puis on AUTORISE au cas par
# cas les applications qui en ont une vraie raison. C'est l'inverse de la
# logique "tout ouvert".
#
# NetGuard ne s'importe pas depuis un fichier .sh : reporte ces décisions
# manuellement dans l'application, OU utilise la fonction d'export/import JSON
# native de NetGuard pour sauvegarder TA configuration une fois faite.
#
# Légende : [DENY] couper le réseau | [ALLOW] autoriser | [WIFI] Wi-Fi seul
# ---------------------------------------------------------------------------

# --- Catégories à couper par défaut (rarement besoin du réseau) ---
[DENY]  Lampe torche
[DENY]  Galerie / visionneuse de photos locale
[DENY]  Lecteur audio local
[DENY]  Calculatrice
[DENY]  Appareil photo (sauf si partage direct nécessaire)
[DENY]  Lecteur de fichiers PDF local
[DENY]  Claviers tiers (préférer un clavier hors ligne)

# --- À autoriser, mais à surveiller (télémétrie fréquente) ---
[WIFI]  Navigateur web (Wi-Fi seul si tu veux économiser les données)
[ALLOW] Messagerie chiffrée (ex. Signal)
[ALLOW] Client e-mail
[ALLOW] Cartographie (couper la localisation en arrière-plan dans Android)

# --- Toujours réviser ---
# Passe en revue CHAQUE app installée. Pour chacune : "a-t-elle besoin du
# réseau pour la fonction que J'EN attends ?" Si non -> [DENY].
# Réévalue après chaque nouvelle installation.
EOF

printf 'Modèle de règles écrit dans : %s\n' "$OUT"
printf 'Rappel : NON EXHAUSTIF, à réviser dans NetGuard. Pas une garantie de blocage.\n'

exit 0
