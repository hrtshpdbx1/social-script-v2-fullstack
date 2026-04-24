# Programme Social Script — Refonte Backend (3 semaines)

## 🗓️ SEMAINE 1 — Fondations, données, lectures publiques

**Objectif de fin de semaine** : une API qui sert en lecture seule (sans auth) toutes les données de Social Script. Tu peux naviguer de `/difficulties` → `/themes` → `/scenarios` depuis Insomnia.

### Jour 1 — Squelette du serveur

**Objectifs**
- Avoir un serveur Express qui tourne avec hot-reload
- Architecture de dossiers propre en place
- Premier endpoint qui répond

**À faire**
- [x] `npm init` dans un nouveau dossier `server/`
- [x] Installer : `express`, `dotenv`, `mongoose`, `cors`
- [x] Créer `.env` et `.env.example` (⚠️ `.env` dans `.gitignore`)
- [x] Créer `app.js` avec un serveur Express minimal qui écoute sur un port défini dans `.env`
- [x] Lancer avec `node --watch app.js` (hot-reload natif, pas besoin de nodemon)
- [ ] Créer l'arborescence :
  ```
  server/
  ├── app.js
  ├── .env
  ├── routes/
  ├── controllers/
  ├── services/
  ├── models/
  ├── middlewares/
  └── config/
  ```
- [x] Créer une route test `GET /` qui renvoie `{ message: "Bienvenue sur l'API de Social Script" }`
- [x] Tester sur Insomnia : code 200 reçu

**Questions à te poser**
- Pourquoi on sépare routes / controllers / services ? Si tu ne sais pas répondre, relis ton cours avant de continuer.
Séparation des préoccupations (separation of concerns). 
 Réutilisabilité des composants (Un contrôleur par type de ressource, plus facile amodifier si besoin), Testabilité. Le changement de technologie : si passage de e MongoDB à PostgreSQL dans le futur, il faudra seuelement modfifier la logique dans les services 
- Pourquoi `.env` ne doit JAMAIS être commit ? Info confidentielles

**Validation** : serveur qui répond sur Insomnia, premier commit fait.

---

### Jour 2 — Connexion MongoDB et premier modèle

**Objectifs**
- Connexion à MongoDB Atlas fonctionnelle
- Premier modèle Mongoose créé
- Comprendre ce qu'est un Schema

**À faire**
- [x] Créer un compte MongoDB Atlas (gratuit), créer un cluster
- [x] Récupérer l'URL de connexion, la mettre dans `.env` (`MONGO_URI=...`)
- [ ] Créer `config/database.js` qui exporte une fonction de connexion à Mongo
- [x] Appeler cette fonction dans `app.js` au démarrage
- [x] Vérifier dans la console : "✅ Connected to MongoDB"
- [x] Créer `models/difficulty.model.js` avec un Schema simple : `title`, `order` (number), `timestamps: true`
- [x] Créer `models/theme.model.js` : `title`, `order`, `timestamps: true`
- [x] Dans MongoDB Compass ou Atlas, insérer manuellement 3 difficultés (easy, medium, hard) et 5 thèmes de test

**Questions à te poser**
- Qu'est-ce qu'un Schema Mongoose ? Quelle différence avec un Model ?
- Pourquoi on sépare la config DB dans un fichier à part ?

**Validation** : serveur connecté à Mongo, 3 difficultés et 3 thèmes visibles dans Atlas.

---

### Jour 3 — Routes de lecture : Difficulties & Themes

**Objectifs**
- Comprendre le flux complet route → controller → service → model
- Implémenter les 2 premières routes de ton API

**À faire**
- [x] Créer `routes/difficulties.router.js` avec la route `GET /`
- [x] Créer `controllers/difficulties.controller.js` avec une fonction `getAllDifficulties`
- [x] Créer `services/difficulties.service.js` avec la fonction qui fait `Difficulty.find()`
- [x] Brancher tout ça dans `router/index.js` : `app.use('/difficulties', difficultiesRouter)`
- [x] Tester sur Insomnia : `GET http://localhost:3000/difficulties` doit te renvoyer tes 3 difficultés
- [x] Faire la même chose pour les thèmes, MAIS avec la route imbriquée :
  - `routes/themes.router.js` (ou mettre la route dans `difficulties.router.js`, à toi de voir)
  - Route : `GET /difficulties/:difficultyId/themes`
  - ⚠️ Pour que ça marche, tes thèmes doivent avoir une référence à une difficulté ! Retourne sur ton model `Theme` et ajoute `difficultyId: { type: ObjectId, ref: 'Difficulty' }`
  - Réinsère tes thèmes de test avec le bon `difficultyId`

**Questions à te poser**
- Quand tu fais `GET /difficulties/:difficultyId/themes`, comment le controller récupère-t-il `:difficultyId` depuis la requête ? (Indice : `req.params`) : **
**Le controller récupére :difficultyid depuis la requete avex req.params.difficultyId**
**ex:  getByDifficutyId: (req, res) => {res.status(200).json({ message: {'Bla'}, id: req.params.difficultyId});}**
**req.params c'est un élement de la route du navigateur : ex "scenario" dans http://localhost:3000/api/scenarios/1 (ne pas confondre avec "req.query" qui est l'élement textuel de l'url : ex GFG dans  http://localhost:3000/api/scenarios/search?name=GFG**
- Quelle différence entre `Model.find()` et `Model.find({ difficultyId: xxx })` ?
*find() sans argument renvoie tous les documents de la collection. find({ difficultyId: xxx }) filtre les élements qui correspondent au prédicat de l'argument*

**Piège classique** : oublier de `await` les appels Mongo. Si tu reçois `Promise { <pending> }` dans ta réponse, c'est ça.

**Validation** : les 2 routes répondent correctement avec tes données de test.

---

### Jour 4 — Modèle Scenario (le gros morceau)

**Objectifs**
- Créer le modèle le plus complexe de ton app
- Comprendre l'embed en Mongoose
- Insérer des scénarios de test

**À faire**
- [x] Créer `models/scenario.model.js`
- [x] Définir le Schema principal avec : `title`, `context`, `characterName`, `characterDialogue`, `characterAvatarSeed`, `status` (enum: 'pending'|'approved'|'rejected', default: 'pending'), `themeId` (ref), `difficultyId` (ref), `authorId` (ref User) — mais tu n'as pas encore User, donc mets un commentaire `// TODO: ref User` et laisse le champ optionnel pour l'instant
- [x ] **Embed les choices** : dans ton schéma Scenario, ajoute un champ `choices` qui est un tableau de sous-documents, chacun avec : `responseText`, `reactionText`, `analysis`, `consequence`, `keyTakeaway`
- [x] Ajouter `timestamps: true`
- [x] Insérer manuellement 2-3 scénarios complets dans Atlas (avec les bons `themeId` et `difficultyId`)

**Questions à te poser**
- Comment on définit un sous-document embed dans Mongoose ? (Cherche "Mongoose subdocuments" ou "embedded documents") : *On a fait un "Subdocument embedded" car ici les options n'ont pas de vie indépendante de leur scénarios. Ce sous shéma, ou subdocument est un tableau que l'on place en haut du document et qui est nesté dans un "shémat parent"*
- Pourquoi on met `status: 'pending'` par défaut ? (Réfléchis au workflow de modération) : *Car on veut qu'une action de modération soit requise sur chaque nouveau scenari ajouté*

**Validation** : un scénario complet visible dans Atlas avec ses 3 choices embed.

---

### Jour 5 — Routes de lecture : Scenarios

**Objectifs**
- Implémenter les 2 dernières routes de lecture publique
- Comprendre la projection Mongoose (renvoyer seulement certains champs)

**À faire**
- [x] Créer `routes/scenarios.router.js`, `controllers/scenarios.controller.js`, `services/scenarios.service.js`
- [x] Route 1 : `GET /themes/:themeId/scenarios` — version **légère**
  - Dans le service : `Scenario.find({ themeId, status: 'approved' }).select('title context')`
  - ⚠️ Le filtre `status: 'approved'` est crucial : un scénario pending ne doit pas être visible publiquement !
  - ⚠️ Le `.select()` permet de ne renvoyer que les champs listés (pas les choices)
- [x] Route 2 : `GET /scenarios/:scenarioId` — version **complète**
  - Dans le service : `Scenario.findById(scenarioId)` (sans filtre de status pour l'instant, on verra)
  - Renvoie tout, y compris les choices
- [x] Tester les 2 routes sur Insomnia avec tes scénarios de test

**Questions à te poser**
- Pourquoi on filtre `status: 'approved'` sur la route liste mais pas (encore) sur la route détail ? 
*GET /difficulties/123/themes/456/scenarios (route liste) --> le status: 'approved' est nécessaire sur cette roite parce que les utilisateur·ices lambda ne doivent voir que les scénarios validés.*  
*GET /scenarios/:id --> sera utilisé par les admins/modérateurs pour consulter tous les scénarios peu importe leur statut — pour les valider, les rejeter, les modifier.*
- Qu'est-ce qui se passe si tu appelles `GET /scenarios/xyz` avec un ID qui n'existe pas ? Ton API renvoie quoi ? Est-ce que c'est un comportement acceptable, ou tu devrais gérer le cas ? *une 404 avec le message message: "L'Id ne correspond à aucun scenario")*

**Validation** : tu peux faire un parcours complet en lecture sur Insomnia : liste difficultés → thèmes d'une difficulté → scénarios d'un thème → détail d'un scénario. 🎉

**Fin de semaine 1** : fais un gros commit, prends une pause, reviens frais pour l'auth.

---

## 🗓️ SEMAINE 2 — Authentification et écriture protégée

**Objectif de fin de semaine** : les utilisateurs peuvent s'inscrire, se connecter, et créer des scénarios. Les routes d'écriture sont protégées par JWT et par rôle.

### Jour 6 — Modèle User + Route Register

**Objectifs**
- Créer le modèle User avec rôles
- Implémenter l'inscription avec hash de mot de passe

**À faire**
- [x] Regarder Demo Aude du 19 janv 26 2/2
- [x] Installer `argon2`
- [x] Créer `models/user.model.js` avec : `firstName`, `lastName`, `email` (unique !), `password`, `role` (enum, default: 'user'), `timestamps: true`
- [x] Créer `routes/auth.router.js`, `controllers/auth.controller.js`, `services/auth.service.js`
- [x] Implémenter la route `POST /auth/register` :
  - Récupérer `firstName`, `lastName`, `email`, `password` depuis `req.body`
  - Vérifier que l'email n'existe pas déjà → sinon, erreur 409
  - Hacher le mot de passe avec `argon2.hash(password)`
  - Créer le user en DB
  - Renvoyer un code 201 avec les infos du user **SANS le password** ⚠️
- [x] Tester sur Insomnia : créer un user, vérifier dans Atlas que le password est bien haché

**Questions à te poser**
- Pourquoi on hache les mots de passe au lieu de les stocker en clair ?
*pour limiter les dégâts en cas de fuite de la base de données*
- Pourquoi Argon2 plutôt que MD5 ou SHA1 ?
*MD5 et SHA1 sont devenus obsolètes*
- Pourquoi on ne renvoie JAMAIS le password dans la réponse API, même haché ?
*La seule chose que l'API doit renvoyer après une connexion réussie, c'est un "Oui" accompagné d'un jeton de session temporaire (comme un JWT).*

**Piège** : ne pas oublier `unique: true` sur le champ email dans le Schema.

**Validation** : un user créé dans Atlas avec un password illisible.

---

### Jour 7 — Route Login + JWT

**Objectifs**
- Comprendre ce qu'est un JWT
- Implémenter le login qui renvoie un token

**À faire**
- [x] Regarder Demo Aude du 20 janv 26 1/2
- [x] Installer `jsonwebtoken`
- [x] Ajouter `JWT_SECRET=...` dans ton `.env` (une longue chaîne aléatoire)
- [x] Implémenter la route `POST /auth/login` :
  - Récupérer `email` et `password` depuis `req.body`
  - Chercher le user par email → sinon erreur 401
  - Vérifier le password avec `argon2.verify(user.password, password)` → sinon erreur 401
  - Générer un token avec `jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })`
  - Renvoyer `{ token, user: { id, email, role } }`
- [x] Tester sur Insomnia : login réussi → tu reçois un token
- [x] Copier ce token et le décoder sur https://jwt.io pour voir ce qu'il y a dedans

**Questions à te poser**
- Pourquoi on met `userId` et `role` dans le payload du JWT ? Qu'est-ce qu'on va en faire après ?
*On va les utiliser dans le front (ex "Bonjour Machine") mais aussi car le rôle va déterminer les accès/droits que les middlewares vont autoriser ou pas*  
- Est-ce que c'est grave si quelqu'un lit le contenu du JWT (sans le modifier) ? (Indice : réponse non-évidente) *Le JWT est encodé, pas chiffré : La partie "payload"  d'un JWT est simplement encodée en Base64Url. N'importe qui peut décoder cette partie en quelques secondes (via des outils comme jwt.io) pour lire les informations qui y sont stockées sans avoir besoin de la clé secrète. Donc nejamais mettre de données sensibles dans le payload d'un JWT.*
- Pourquoi on met une expiration au token ? *Limiter l'impact d'un vol de jeton*

**Validation** : tu reçois un token au login, tu peux le décoder sur jwt.io et voir ton userId et ton role.

---

### Jour 8 — Middleware d'authentification + middleware de rôles

**Objectifs**
- Comprendre ce qu'est un middleware
- Créer les 2 middlewares qui vont protéger toutes tes routes sensibles

**À faire**
- [x] Regarder demo 20 janv 1/2
- [x] Créer `middlewares/auth.middleware.js` avec une fonction `requireAuth` :
  - Récupérer le token depuis `req.headers.authorization` (format `Bearer xxx`)
  - Si absent → 401
  - Vérifier avec `jwt.verify(token, process.env.JWT_SECRET)` → si invalide → 401
  - Attacher le payload à `req.user = decoded`
  - Appeler `next()`
- [x ] Créer `middlewares/role.middleware.js` avec une fonction `requireRole(...allowedRoles)` qui :
  - Vérifie que `req.user.role` est dans `allowedRoles` (c'est donc une "higher-order function", elle prend des args et renvoie un middleware)
  - Sinon → 403
- [x ] Créer une route test protégée `GET /auth/me` qui utilise `requireAuth` et renvoie les infos du user connecté
- [ x] Tester sur Insomnia :
  - Sans token → 401 ✅
  - Avec un token bidon → 401 ✅
  - Avec un vrai token → 200 avec les infos du user ✅

**Questions à te poser**
- Quelle différence entre 401 (Unauthorized) et 403 (Forbidden) ? Quand utiliser lequel ?
*401 veut dire qu'une connexione st requise pour arriver sur la page, 403 veut dire qu'on est pas authorisé, meme si on est connecté, par exemple si on est un simple user et pas un admin* 
- Pourquoi `requireRole` est une fonction qui renvoie une fonction, au lieu d'être directement un middleware ?
*Car on a besoin d'argument, ici "allowedRoles"*
- Dans Insomnia, où est-ce que tu colles ton token pour qu'il soit envoyé dans le header `Authorization` ?
*dans Auth > Bearer Token > Token*

**Validation** : tu as 2 middlewares réutilisables prêts à protéger n'importe quelle route.

---

### Jour 9 — Route POST /scenarios (création protégée)

**Objectifs**
- Première vraie route d'écriture protégée
- Connecter l'auth au modèle Scenario

**À faire**
- [x] Retourner dans `models/scenario.model.js` et rendre `authorId` obligatoire avec la ref vers User
- [x] Implémenter `POST /scenarios` dans ton router/controller/service :
  - Protégée par `requireAuth` (n'importe quel user connecté peut proposer)
  - Récupérer les données depuis `req.body`
  - Récupérer l'`authorId` depuis `req.user.userId` (pas depuis le body ! ⚠️)
  - Forcer `status: 'pending'` côté serveur (ne jamais faire confiance au client)
  - Créer le scénario et le renvoyer avec code 201
- [x] Tester sur Insomnia :
  - Sans token → 401
  - Avec token → 201, scénario créé avec status pending
  - Vérifier dans Atlas que l'`authorId` correspond bien à ton user

**Questions à te poser**
- Pourquoi on ne fait JAMAIS confiance au `authorId` envoyé dans `req.body` ? 
- Pourquoi on force `status: 'pending'` côté serveur même si le client envoie autre chose ?
- Qu'est-ce qui se passe si le body contient des champs bizarres en plus (genre `isAdmin: true`) ? Comment Mongoose se comporte ? (Indice : regarde "strict mode" dans la doc)

**Validation** : un user connecté peut créer un scénario en pending.

---

### Jour 10 — Validation des données + gestion d'erreurs

**Objectifs**
- Ne plus accepter n'importe quoi dans les POST
- Centraliser la gestion d'erreurs

**À faire**
- [x] Installer yup
- [x] Créer un middleware `scenario-validation.js` qui prend un schéma Yup et valide `req.body`
- [x] Créer un schéma Yup pour la création d'un scénario (titre obligatoire, context obligatoire, choices : tableau de exactement 3 éléments, etc.)
- [x] Appliquer ce middleware sur `POST /scenarios`
- [x] Tester les cas d'erreur sur Insomnia : body vide, champs manquants, 2 choices au lieu de 3, etc.
- [x] Créer un middleware global de gestion d'erreurs (à la fin de ta chaîne de middlewares dans `app.js`) qui catche toutes les erreurs et renvoie un format JSON propre
- [x] Revoir toutes tes routes existantes : est-ce que tes erreurs sont gérées correctement ? (try/catch, next(error))

**Questions à te poser**
- Pourquoi valider côté serveur même si on valide déjà côté front ?
*Car on n'accède pas seulement aux données via le front, mais aussi pour des interface comme Insomnia, c'est donc une sécurité supplémentaire*

- Quelle différence entre une erreur 400 (Bad Request) et 422 (Unprocessable Entity) ?
*La 400 (Bad Request) indique une erreur coté client (ex: une syntaxe de requête mal formée)*
*La 422 (Unprocessable Content) indique que le serveur a compris le type de contenu de la requête et que la syntaxe du contenu était correcte, mais qu'il n'a pas pu traiter les instructions qu'il contenait.*

**Validation** : un POST avec un body invalide renvoie une erreur propre avec un message clair. Fin de semaine 2, gros commit.

**MAJ** Decicision de propose aux utilisateur·ice de soumettre un theme en plus de ceux proposés.
Côté front, le formulaire de création de scénario aura un bouton "proposer un nouveau thème" qui appelle POST /themes d'abord, récupère le nouvel _id, puis l'utilise dans le formulaire du scénario
- créer nouvelle route
---

## 🗓️ SEMAINE 3 — Modération, reporting, ressources, polish

**Objectif de fin de semaine** : le workflow complet de modération fonctionne. Les ressources sont implémentées. Ton API est prête pour le front.

### Jour 11 — Modèle Report + route de création

**À faire**
- [x] Créer `models/report.model.js` : `reportType` (enum), `reason`, `reporterId` (ref User), `status` (enum: 'pending'|'reviewed'|'dismissed', default: 'pending'), `reviewedBy` (ref User, optional), `reviewedAt` (Date, optional), `scenarioId` (ref), `timestamps: true`
- [x] Créer `routes/reports.router.js`
- [x] Implémenter `POST /scenarios/:scenarioId/report` :
  - Protégée par `requireAuth`
  - Vérifier que le scénario existe
  - Créer un report avec `reporterId = req.user.userId` et `status = 'pending'`
  - Renvoyer 201
- [x] Tester sur Insomnia


---

### Jour 12 — Routes de modération (modérateurs et admins)

**À faire**
- [x] Un seul admin/router avec 6 routes (Reports : 2 routes, Scenarios : 2 routes, Themes : 2 routes)
- [x] `GET /admin/reports` : liste tous les reports, filtrable par status. Protégée par `requireAuth` + `requireRole('moderator', 'admin')`
- [x] `PATCH /admin/reports/:reportId` : permet à un modérateur de changer le status d'un report (`reviewed` ou `dismissed`). Le serveur doit automatiquement set `reviewedBy = req.user.userId` et `reviewedAt = new Date()`
- [x] `GET /admin/scenarios?status=pending` : liste les scénarios en attente de validation. Protégée par rôle.
- [x] `PATCH /admin/scenarios/:scenarioId/status` : permet à un modérateur de passer un scénario à `approved` ou `rejected`. Same deal avec `reviewedBy` / `reviewedAt`.
- [x] Ajouter `status` (enum: 'pending'|'approved'|'rejected', default: 'pending') au model `Theme`
- [ ] Implémenter `POST /themes` :
  - Protégée par `requireAuth`
  - Créer le theme avec `status: 'pending'` forcé côté serveur
  - Renvoyer 201 avec le `_id` du theme créé (le front en a besoin pour le formulaire scénario)
  - Validator Yup : `title` obligatoire, `description` optionnel, `icon` obligatoire
- [x] `GET /admin/themes?status=pending` : liste les thèmes en attente. Protégée modérateur/admin.
- [x] `PATCH /admin/themes/:themeId/status` : approuver ou rejeter un thème proposé.

**Questions à te poser**
- Pourquoi les routes de modération commencent par `/admin/` ? Est-ce une bonne pratique ou pas ?
Pour créer un espace spécial pour les admins, qui ne sera pas accesssibles aux autres utisiteurs (grace a nos Middleware requireRole('moderator', 'admin')`)
- Un modérateur peut-il faire TOUT ce qu'un admin peut faire ? Si non, où est-ce que tu mettras la différence concrètement ?
*Modérateur : valider/rejeter scénarios, thèmes, voir les reports*
*Admin : tout ce que fait le modérateur + supprimer définitivement un contenu, gérer les utilisateurs, changer les rôles*
 *Sur certaines routes le requireRole('moderator', 'admin') et sur d'autres uniquement requireRole('admin').*

- Un thème en `pending` peut-il être utilisé dans un scénario ? 
  Si oui, que se passe-t-il si le thème est ensuite rejeté ?
*Le thème passe à rejected, et les scénarios liés restent tels quels avec leur themeId qui pointe vers un thème rejeté. C'est le front qui gère de ne pas les afficher. Ces scénarios sont toujours pending en DB. Un admin pourrait plus tard les réaffecter vers le thème "travail" qui existe déjà*
*TODO :  feature :un modo/admin pourraient réafecter un scneation sur un autre theme en cas de doublon*

**Validation** : test complet du workflow : user crée scénario (pending) → modérateur le voit dans la liste pending → modérateur l'approuve → le scénario apparaît maintenant dans `GET /themes/:id/scenarios`.

---

### Jour 13 — Gestion des utilisateurs (admin uniquement)

**À faire**
- [x] `GET /admin/users` : liste tous les users. Protégée par `requireRole('admin')` uniquement.
- [x] `PATCH /admin/users/:userId/role` : permet à un admin de promouvoir un user au rôle de modérateur (ou de rétrograder). Protégée admin uniquement.
- [x] ⚠️ Attention : un admin ne doit pas pouvoir rétrograder un autre admin ? Ou pouvoir se rétrograder lui-même ? Pense à ces edge cases.
- [x] `DELETE /admin/scenarios/:scenarioId` : suppression d'un scénario. Admin uniquement (un modérateur peut rejeter, mais seul un admin peut supprimer définitivement).

**Questions à te poser**
- Comment protéger contre le cas où il ne resterait plus aucun admin dans la base ?
*C'est protégé par la vérification d'auto-supression*
- Faut-il vraiment supprimer (`DELETE`) ou plutôt "soft delete" (un champ `deletedAt`) ? Quels sont les pour et contre ?
*Un soft-deleted permettrait une traçabilité ("qui a supprimé quoi, quand ?"), de restaurer un contenu supprimé par erreur et d'avoir des stats/historiques qui restent cohérents*

---

### Jour 14 — Ressources et catégories

**À faire**
- [x] Créer `models/resourceCategory.model.js` et `models/resource.model.js` (avec ref vers category)
- [x] Routes publiques en lecture :
  - `GET /resource-categories` : liste des catégories
  - `GET /resource-categories/:categoryId/resources` : ressources d'une catégorie (filtrées sur `isPublished: true`)
  - `GET /resources/:resourceId` : détail d'une ressource
- [x] Routes protégées admin :
  - `POST /resources` + `PATCH /resources/:id` + `DELETE /resources/:id`
- [x] Insérer quelques catégories et ressources de test via Insomnia

**Questions à te poser**
- Est-ce que le modèle de "ressource" est exactement le même que tes scénarios côté routes ? Remarque les similitudes avec ce que tu as déjà fait pour les scénarios.

---

### Jour 15 — Polish, tests manuels, documentation

**À faire**
- [ ] Créer un fichier `API.md` à la racine avec la liste de TOUTES tes routes, leurs méthodes, leur protection, un exemple de body et un exemple de réponse. Ta bible.
- [ ] Revoir chaque route : est-ce que les codes HTTP sont cohérents ? (200, 201, 400, 401, 403, 404, 409, 500)
- [ ] Revoir chaque controller : est-ce que les try/catch sont partout ? Est-ce que les erreurs remontent bien au middleware global ?
- [ ] Créer une collection Insomnia complète que tu peux exporter (avec toutes les routes, pré-remplies avec des exemples)
- [ ] Tester un workflow complet end-to-end : register → login → créer scénario → report → modération → approbation → lecture publique
- [ ] Vérifier les variables d'environnement : est-ce que tout ce qui est secret est bien dans `.env` et pas en dur dans le code ?
- [ ] Vérifier le CORS : est-ce configuré pour accepter les requêtes de ton futur front ?
- [ ] Gros commit final, push, tu respires.

**Validation finale** : tu peux faire tourner ton API, ouvrir Insomnia, et tester chaque fonctionnalité de Social Script sans bug. Tu es prête à brancher ton front.

---

## 📚 Ressources à avoir sous la main tout au long

- **Doc Mongoose** : https://mongoosejs.com/docs/ — tu y retourneras souvent
- **Doc Express** : https://expressjs.com/
- **jwt.io** : pour décoder et comprendre tes tokens
- **Doc Zod** : https://zod.dev/ — pour la validation
- **Les codes HTTP** : https://http.cat/ (oui c'est une blague, mais tu retiens mieux)

---

## ⚠️ Pièges classiques qui vont t'arriver

1. **Oublier `await`** sur un appel Mongo → tu reçois une promesse au lieu des données
2. **Oublier `unique: true`** sur les champs uniques → tu as des doublons
3. **Faire confiance à `req.body`** → bug de sécurité, toujours valider et prendre les infos sensibles depuis `req.user` (le JWT)
4. **Oublier les try/catch** → le serveur crash au moindre problème
5. **Renvoyer le password dans les réponses** → énorme faille de sécurité
6. **Mettre les secrets dans le code au lieu du `.env`** → et les push sur GitHub
7. **Oublier de filtrer `status: 'approved'`** sur les routes publiques → les scénarios en attente sont visibles

---

## 🎯 Ce qui sera à faire APRÈS ces 3 semaines (v2)

- Tests automatisés (Jest + Supertest)
- Rate limiting pour éviter le spam
- Pagination sur les listes (`?page=1&limit=20`)
- Upload d'images pour les avatars
- Refresh tokens (pour ne pas faire expirer l'utilisateur au bout de 7 jours)
- Reset password par email
- Déploiement (Render, Railway, ou autre)

Mais ça, c'est quand tu auras fini la v1 proprement.

