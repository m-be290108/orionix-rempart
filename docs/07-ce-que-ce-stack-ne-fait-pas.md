# 07 — Ce que ce stack ne fait PAS

> **Niveau :** tous — **document important** · **Réversible ?** lecture seule · **Prérequis :** [00](00-threat-model.md) · **Temps estimé :** 15 min

Ce document est aussi important que les autres, et délibérément aussi détaillé. **L'honnêteté sur les limites est une fonctionnalité de sécurité**, pas une clause de style : un stack dont on surestime la portée crée une fausse confiance qui pousse à prendre des risques qu'on n'aurait pas pris autrement.

## Le stack ne te rend pas anonyme

Il **réduit ton empreinte**. Il ne te rend pas introuvable. Aucune combinaison décrite ici ne mérite le mot « anonyme » ou « intraçable » face à un adversaire déterminé et outillé. Si tu as besoin d'un véritable anonymat vital (lanceur d'alerte, source journalistique à haut risque), ce dépôt **n'est pas suffisant** — il te faut un accompagnement spécialisé et un modèle de menace dédié.

## Menaces explicitement hors de portée

### Logiciels espions de classe étatique (type Pegasus)

Ces outils exploitent des **vulnérabilités 0-day**, parfois en **0-clic** (aucune action de ta part). Ils s'exécutent **avant** que tes réglages réseau ou d'identifiants n'aient le moindre effet. GrapheneOS **réduit la surface d'attaque** (durcissement mémoire, moins de code Google, mises à jour rapides) et **complique** ce type d'attaque, mais **ne constitue pas une garantie**. Aucun pare-feu par app, aucun VPN, aucune randomisation MAC ne bloque un implant noyau.

### Attaques sur le *baseband* (processeur radio)

Le modem cellulaire est un système séparé du système d'exploitation. Une attaque qui vise le *baseband* (ou une station de base mobile factice, *IMSI catcher*) opère à un niveau que ce dépôt **ne traite pas**.

### Opérateur mobile compromis ou réquisitionné

Tant que ton téléphone est connecté au réseau cellulaire, l'opérateur connaît, par construction, ta **localisation approximative** (triangulation) et les **métadonnées** de tes communications cellulaires. Un VPN ou Tor masque le **contenu** et la **destination Internet**, **pas** ta présence sur le réseau de l'opérateur. Le seul vrai contre-mesure (couper la radio / mode avion) a un coût d'usage évident.

### Saisie physique d'un appareil non chiffré ou déverrouillé

Aucun logiciel ne protège un appareil **allumé et déverrouillé** qu'on te retire des mains. Le chiffrement n'a de valeur que **téléphone éteint ou verrouillé** avec un **secret fort**. Un code court ou un schéma simple annule l'essentiel de la protection.

### Corrélation par un adversaire global

Un adversaire capable d'observer **simultanément** l'entrée et la sortie d'un réseau d'anonymisation (Tor, VPN) peut, en théorie et parfois en pratique, corréler les flux et te désanonymiser. C'est une limite **structurelle**, pas un défaut de configuration.

### Le facteur humain

Le stack ne te protège pas de toi-même : réutiliser un identifiant, te connecter à un compte nominatif derrière Tor, accorder une permission par réflexe, installer une app piégée. La plupart des désanonymisations réelles viennent d'une **erreur d'usage**, pas d'une faille cryptographique.

## Limites des briques, une par une

- **GrapheneOS** : réduit la surface d'attaque, ne rend pas invulnérable ; ne te protège pas d'une app malveillante à laquelle **tu** donnes des permissions.
- **Pare-feu par app / DNS filtrant** : réduit la télémétrie et le pistage DNS ; le SNI et l'IP de destination peuvent encore fuiter sans tunnel ; ne neutralise pas une app vraiment malveillante déjà installée.
- **Tor / VPN** : déplacent ou diluent la confiance, ne la suppriment pas ; un nœud de sortie ou un fournisseur VPN reste un témoin possible ; le *fingerprinting* persiste.
- **Randomisation MAC / identifiants** : limite le pistage par identifiants explicites ; n'efface pas le *fingerprinting* logiciel ni l'identité cellulaire.
- **Statut root masqué (05)** : ne franchit pas l'attestation matérielle forte ; viole les conditions des services tiers ; augmente la surface d'attaque.

## En résumé

Ce stack est efficace **contre le pistage commercial de masse, le profilage publicitaire, l'écoute sur Wi-Fi public et les applications trop curieuses**. Il n'est **pas** conçu, et ne doit pas être présenté, comme une protection contre un adversaire ciblé, sophistiqué ou étatique. Cale tes attentes sur cette réalité — c'est ainsi qu'on prend de bonnes décisions de sécurité.
