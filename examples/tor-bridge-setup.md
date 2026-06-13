# Ponts Tor : Snowflake et obfs4

> Que faire quand l'accès à Tor est bloqué sur ton réseau. Ce document est une **explication**, pas un script. Suis toujours la documentation officielle de Tor / Orbot.

Quand un réseau bloque les relais Tor publics, on passe par un **pont** (*bridge*) : un point d'entrée vers le réseau Tor qui n'est pas listé publiquement, donc plus difficile à bloquer. Sur Android, la configuration se fait dans **Orbot** (voir [`docs/03`](../docs/03-resistance-correlation.md)).

- Orbot officiel : <https://orbot.app> · code : <https://github.com/guardianproject/orbot-android>
- Documentation Tor sur les ponts : <https://bridges.torproject.org>

## Option 1 — Snowflake (le plus simple)

Snowflake fait transiter ta connexion par des **relais bénévoles éphémères** (des navigateurs de volontaires). Il résiste bien au blocage car il ressemble à du trafic WebRTC ordinaire.

1. Ouvre Orbot.
2. Dans les réglages des ponts, choisis **Snowflake**.
3. Connecte-toi. Aucun code à saisir : Snowflake trouve un relai automatiquement.

À privilégier si tu ne sais pas quel type de pont utiliser.

## Option 2 — obfs4 (transport enfichable)

obfs4 **brouille** l'apparence du trafic Tor pour qu'il ne soit pas reconnaissable par inspection. Il faut une **ligne de pont** (adresse + empreinte + clé).

1. Obtiens une ligne obfs4 :
   - depuis <https://bridges.torproject.org> (sélectionne obfs4), ou
   - par e-mail automatique en écrivant à l'adresse indiquée sur le site de Tor (utile si le site des ponts est lui-même bloqué).
2. Dans Orbot, choisis **« fournir un pont manuellement »** et colle la ligne obfs4.
3. Connecte-toi.

Une ligne obfs4 ressemble à :

```
obfs4 <IP>:<port> <empreinte> cert=<clé> iat-mode=0
```

(Les valeurs réelles te sont fournies par le service officiel ; ne réutilise pas d'exemple trouvé au hasard.)

## Limites

- Un pont contourne le **blocage** d'accès à Tor ; il ne change rien aux limites de Tor lui-même (voir [`docs/03`](../docs/03-resistance-correlation.md) et [`docs/07`](../docs/07-ce-que-ce-stack-ne-fait-pas.md)).
- Dans certaines juridictions, l'usage de Tor ou de ponts peut être restreint. Renseigne-toi sur le droit local (voir le scénario voyage dans [`docs/06`](../docs/06-scenarios-pratiques.md)).
