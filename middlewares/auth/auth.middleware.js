// auth.middleware.js

// va vérifier si un token a bien été fourni
// si oui, on continue la requête
// si pas de token, on arrête la requête et on met un code d'erreur


const jwtUtils = require('../../utils/jwt.utils');

//todo: 
// - Récupérer le token depuis `req.headers.authorization` (format `Bearer xxx`)
//- Si absent → 401
//- Vérifier avec `jwt.verify(token, process.env.JWT_SECRET)` → si invalide → 401
// - Attacher le payload à`req.user = decoded`
// - Appeler`next()`

const requireAuth =  async (req, res, next) => {
        //Récupérer le token depuis le header authorization`
        const authorization = req.headers.authorization;
        // console.log(authorization)
        // si pas de token pas ajouté : undefined et fin de la requête 
        if (!authorization) {
            res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
        }

        // Si quelqu'un a envoyé un "Bearer" non suivi d'un token
        //split = sépare une chaine de caractère
        //découpe ici la chaine de caractère après l'espace et renvoit deux tableaux, dans le premier [0] "Bearer" dans le second le token [1]
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
        }

        // ? S'il y'a un token :

        // On essaie de le décoder le token
        try {
            const payload = await jwtUtils.decode(token);
            // Stocker le payload récupéré dans notre objet req afin de savoir à tout moment dans la suite de la requête qui est l'utilisateur·ice qui est à l'origine de la requête
            // on ajoute une info dans la requête en ajouter une nouvelle propriété à l'arrache
            req.user = payload;

            
            // on continue la requête
            next();
        } catch (err) {
            // le décodage a planté
            res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
        }
    }

module.exports = requireAuth; 