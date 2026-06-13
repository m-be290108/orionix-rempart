#!/usr/bin/env bash
#
# verify-grapheneos.sh
#
# CE SCRIPT NE VÉRIFIE RIEN À TA PLACE ET N'INSTALLE RIEN.
#
# Il explique les DEUX mécanismes réels de vérification d'une installation
# GrapheneOS, et rappelle pourquoi « ouvrir une page web et faire confiance »
# n'est PAS une vérification (c'est un contre-modèle exposé au MITM).
#
# Un appareil ne peut pas prouver sa propre intégrité de façon fiable s'il est
# déjà compromis : l'attestation sérieuse nécessite un SECOND appareil.
#
# Référence officielle (à suivre depuis le site, pas depuis ce script) :
#   - Installation : https://grapheneos.org/install/web
#   - Releases     : https://grapheneos.org/releases
#   - Attestation  : application "Auditor" (GrapheneOS) + https://attestation.app
#
# Licence : Apache-2.0. Non destructif. Aucune action privilégiée.

set -euo pipefail

note() { printf '  %s\n' "$1"; }
title() { printf '\n=== %s ===\n' "$1"; }

title "verify-grapheneos.sh — guide de vérification (lecture seule)"
note "Ce script affiche des explications. Il ne télécharge, ne flashe et ne"
note "vérifie rien automatiquement. Suis toujours la procédure officielle."

# --- Dépendances optionnelles : on signale, on ne bloque pas. ---
title "Outils détectés (informatif)"
for tool in fastboot adb sha256sum; do
  if command -v "$tool" >/dev/null 2>&1; then
    note "[ok]   $tool présent"
  else
    note "[abs]  $tool absent (non requis pour ce guide)"
  fi
done

title "Mécanisme 1 — Empreinte de l'image AVANT le flash (côté ordinateur)"
note "But : s'assurer que l'image téléchargée n'a pas été altérée en transit."
note "1. Télécharge l'image factory depuis https://grapheneos.org/releases"
note "2. Télécharge aussi sa signature/empreinte publiée sur le site officiel."
note "3. Compare l'empreinte calculée localement à celle publiée :"
note "     sha256sum <image-grapheneos.zip>"
note "   puis vérifie qu'elle correspond EXACTEMENT à la valeur officielle."
note "   (GrapheneOS publie aussi des signatures vérifiables ; voir le site.)"
note "Pourquoi côté ordinateur : tu vérifies l'image AVANT qu'elle ne touche"
note "le téléphone, donc avant tout risque de compromission de l'appareil."

title "Mécanisme 2 — Attestation matérielle APRÈS installation (Auditor)"
note "But : vérifier l'intégrité du système installé et du verified boot."
note "- L'AUTO-attestation locale (l'appareil s'audite lui-même) a une valeur"
note "  LIMITÉE : un appareil compromis peut mentir sur son propre état."
note "- Attestation FORTE = un SECOND appareil Android avec l'app Auditor :"
note "    1. Installe 'Auditor' (GrapheneOS) sur les DEUX appareils."
note "    2. Mode 'auditee' sur l'appareil à vérifier, 'auditor' sur l'autre."
note "    3. Apparie-les par QR code ; le second vérifie le premier."
note "- Le service https://attestation.app peut servir de vérificateur distant,"
note "  mais suppose qu'Auditor tourne sur l'appareil audité."

title "Anti-modèle à éviter"
note "NE considère PAS comme une 'vérification' le simple fait d'ouvrir une page"
note "web sur le téléphone qui affiche 'tout va bien'. Une page peut être"
note "falsifiée (MITM), et un appareil compromis peut afficher ce qu'il veut."
note "La confiance vient de l'empreinte (mécanisme 1) et de l'attestation"
note "croisée avec un second appareil (mécanisme 2), pas d'un écran rassurant."

title "Résumé"
note "Pour une vérification sérieuse, prévois un DEUXIÈME téléphone Android."
note "Suis la procédure officielle : https://grapheneos.org/install/web"

exit 0
