'use strict';
/*
 * Orionix Rempart — démo hors-ligne.
 * Tout s'exécute localement dans le navigateur. AUCUNE requête réseau.
 * 1) Empreinte de navigateur (fingerprint) — lecture seule des API standard.
 * 2) Lecteur + nettoyeur de métadonnées EXIF/GPS d'une photo choisie par l'utilisateur.
 */
(function () {
  // ---------------------------------------------------------------- utils
  var $ = function (id) { return document.getElementById(id); };

  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  function fpRow(label, value, note) {
    var tr = document.createElement('tr');
    var th = document.createElement('th'); th.textContent = label;
    var td = document.createElement('td');
    td.textContent = (value === undefined || value === null || value === '') ? '(indisponible)' : String(value);
    var nd = document.createElement('td'); nd.className = 'note';
    if (note) { nd.innerHTML = note; }
    tr.appendChild(th); tr.appendChild(td); tr.appendChild(nd);
    return tr;
  }

  // ---------------------------------------------------------- fingerprint
  function canvasFingerprint() {
    try {
      var c = document.createElement('canvas');
      c.width = 240; c.height = 60;
      var ctx = c.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '16px Arial';
      ctx.fillStyle = '#f60'; ctx.fillRect(0, 0, 120, 30);
      ctx.fillStyle = '#069'; ctx.fillText('Orionix Rempart ⚡', 2, 2);
      ctx.strokeStyle = 'rgba(0,80,160,0.7)';
      ctx.beginPath(); ctx.arc(60, 30, 20, 0, Math.PI * 2); ctx.stroke();
      return fnv1a(c.toDataURL());
    } catch (e) {
      return 'indisponible';
    }
  }

  function webglInfo() {
    try {
      var c = document.createElement('canvas');
      var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) { return { vendor: '(pas de WebGL)', renderer: '' }; }
      var dbg = gl.getExtension('WEBGL_debug_renderer_info');
      var vendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
      var renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
      return { vendor: vendor, renderer: renderer };
    } catch (e) {
      return { vendor: 'indisponible', renderer: '' };
    }
  }

  function renderFingerprint() {
    var body = $('fp-body');
    var wg = webglInfo();
    var dnt = navigator.doNotTrack;
    if (dnt === '1') { dnt = '1 (activé)'; }
    else if (dnt === '0') { dnt = '0 (désactivé)'; }

    var docs03 = '→ <a href="../docs/03-resistance-correlation.md">docs/03</a>';
    var rows = [
      ['User-Agent', navigator.userAgent, 'Modèle, OS et navigateur. ' + docs03 + '.'],
      ['Plateforme', navigator.platform, ''],
      ['Langues', (navigator.languages || [navigator.language]).join(', '), 'Indice de région.'],
      ['Écran', screen.width + '×' + screen.height + ' @' + (window.devicePixelRatio || 1) + 'x · ' + screen.colorDepth + ' bits', 'Combinaison discriminante.'],
      ['Fuseau horaire', Intl.DateTimeFormat().resolvedOptions().timeZone, 'Localise approximativement.'],
      ['Cœurs CPU (logiques)', navigator.hardwareConcurrency, ''],
      ['Mémoire (approx.)', navigator.deviceMemory ? navigator.deviceMemory + ' Go' : undefined, ''],
      ['Points tactiles', navigator.maxTouchPoints, ''],
      ['Cookies activés', navigator.cookieEnabled, ''],
      ['Do Not Track', dnt, 'Signal souvent ignoré par les traqueurs.'],
      ['WebGL — fabricant', wg.vendor, 'Identifie le GPU.'],
      ['WebGL — rendu', wg.renderer, ''],
      ['Empreinte Canvas', canvasFingerprint(), 'Hash du rendu graphique : très discriminant. ' + docs03 + '.']
    ];

    var combinedParts = [];
    rows.forEach(function (r) {
      body.appendChild(fpRow(r[0], r[1], r[2]));
      combinedParts.push(String(r[1]));
    });
    $('fp-combined').textContent = fnv1a(combinedParts.join('|'));
  }

  // ---------------------------------------------------------------- EXIF
  // Parseur EXIF minimal : extrait Make/Model/Date + GPS d'un JPEG.
  function readExif(buffer) {
    var dv = new DataView(buffer);
    if (dv.byteLength < 4 || dv.getUint16(0) !== 0xFFD8) { return { jpeg: false }; }
    var off = 2, len = dv.byteLength;
    while (off + 4 <= len) {
      var marker = dv.getUint16(off);
      if (marker === 0xFFDA || marker === 0xFFD9) { break; }      // SOS / EOI : plus d'EXIF
      if ((marker & 0xFF00) !== 0xFF00) { break; }                // segment invalide
      var size = dv.getUint16(off + 2);
      if (marker === 0xFFE1 && dv.getUint32(off + 4) === 0x45786966) { // "Exif"
        return parseTiff(dv, off + 10);
      }
      off += 2 + size;
    }
    return { jpeg: true, exif: false, tags: {} };
  }

  function parseTiff(dv, tiff) {
    var le = dv.getUint16(tiff) === 0x4949; // 'II' = little-endian
    function u16(o) { return dv.getUint16(o, le); }
    function u32(o) { return dv.getUint32(o, le); }
    function rational(o) { var d = u32(o + 4); return d === 0 ? 0 : u32(o) / d; }
    function ascii(entryOff, count) {
      var o = count > 4 ? tiff + u32(entryOff + 8) : entryOff + 8;
      var s = '';
      for (var i = 0; i < count; i++) {
        var ch = dv.getUint8(o + i);
        if (ch === 0) { break; }
        s += String.fromCharCode(ch);
      }
      return s.trim();
    }

    function entries(start) {
      var n = u16(start), list = [];
      for (var i = 0; i < n; i++) {
        var e = start + 2 + i * 12;
        list.push({ tag: u16(e), type: u16(e + 2), count: u32(e + 4), off: e });
      }
      return list;
    }

    var tags = {};
    var ifd0 = entries(tiff + u32(tiff + 4));
    var gpsPtr = null, exifPtr = null;
    ifd0.forEach(function (en) {
      if (en.tag === 0x8825) { gpsPtr = tiff + u32(en.off + 8); }
      if (en.tag === 0x8769) { exifPtr = tiff + u32(en.off + 8); }
      if (en.tag === 0x010F) { tags['Fabricant'] = ascii(en.off, en.count); }
      if (en.tag === 0x0110) { tags['Modèle'] = ascii(en.off, en.count); }
      if (en.tag === 0x0132) { tags['Date (fichier)'] = ascii(en.off, en.count); }
    });

    if (exifPtr) {
      entries(exifPtr).forEach(function (en) {
        if (en.tag === 0x9003) { tags['Date de prise de vue'] = ascii(en.off, en.count); }
      });
    }

    if (gpsPtr) {
      var latRef, lonRef, lat, lon;
      entries(gpsPtr).forEach(function (en) {
        if (en.tag === 1) { latRef = String.fromCharCode(dv.getUint8(en.off + 8)); }
        if (en.tag === 3) { lonRef = String.fromCharCode(dv.getUint8(en.off + 8)); }
        if (en.tag === 2) { var o2 = tiff + u32(en.off + 8); lat = rational(o2) + rational(o2 + 8) / 60 + rational(o2 + 16) / 3600; }
        if (en.tag === 4) { var o4 = tiff + u32(en.off + 8); lon = rational(o4) + rational(o4 + 8) / 60 + rational(o4 + 16) / 3600; }
      });
      if (lat !== undefined && lon !== undefined) {
        if (latRef === 'S') { lat = -lat; }
        if (lonRef === 'W') { lon = -lon; }
        tags['__gps'] = { lat: lat, lon: lon };
      }
    }

    return { jpeg: true, exif: Object.keys(tags).length > 0, tags: tags };
  }

  function showExif(result, file) {
    var resultBox = $('exif-result');
    var body = $('exif-body');
    var actions = $('exif-actions');
    body.innerHTML = '';
    actions.innerHTML = '';
    resultBox.hidden = false;

    if (!result.jpeg) {
      body.appendChild(fpRow('Format', 'Ce n\'est pas un JPEG lisible ici (essaie une photo .jpg).', ''));
      return;
    }
    if (!result.exif) {
      body.appendChild(fpRow('Métadonnées', 'Aucune métadonnée EXIF trouvée. 👍 (Cette photo ne révèle rien d\'évident.)', ''));
      return;
    }

    var t = result.tags;
    Object.keys(t).forEach(function (k) {
      if (k === '__gps') { return; }
      body.appendChild(fpRow(k, t[k], ''));
    });

    if (t['__gps']) {
      var g = t['__gps'];
      var tr = document.createElement('tr');
      tr.className = 'tag-warn';
      var th = document.createElement('th'); th.textContent = '⚠ Position GPS';
      var td = document.createElement('td');
      td.innerHTML = '<span class="gps">' + g.lat.toFixed(5) + ', ' + g.lon.toFixed(5) + '</span>'
        + ' — le lieu exact de la prise de vue est inscrit dans le fichier.';
      var nd = document.createElement('td'); nd.className = 'note';
      nd.innerHTML = '→ <a href="../docs/06-scenarios-pratiques.md">docs/06</a>';
      tr.appendChild(th); tr.appendChild(td); tr.appendChild(nd);
      body.appendChild(tr);
    }

    buildCleanDownload(file, actions);
  }

  function buildCleanDownload(file, actions) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      try {
        var c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        c.getContext('2d').drawImage(img, 0, 0);
        c.toBlob(function (blob) {
          URL.revokeObjectURL(url);
          if (!blob) { return; }
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = (file.name.replace(/\.[^.]+$/, '') || 'image') + '-sans-metadonnees.jpg';
          a.className = 'dl';
          a.textContent = '⬇ Télécharger la copie nettoyée (sans métadonnées)';
          actions.appendChild(a);
        }, 'image/jpeg', 0.92);
      } catch (e) {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = function () { URL.revokeObjectURL(url); };
    img.src = url;
  }

  function handleFile(file) {
    if (!file) { return; }
    var reader = new FileReader();
    reader.onload = function (e) {
      showExif(readExif(e.target.result), file);
    };
    reader.readAsArrayBuffer(file);
  }

  // ------------------------------------------------------------- wiring
  function initExifUI() {
    var drop = $('drop');
    var input = $('file');
    $('pick').addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () { handleFile(input.files[0]); });

    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); });
    });
    drop.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { renderFingerprint(); } catch (e) { /* tolérant */ }
    initExifUI();
  });
})();
