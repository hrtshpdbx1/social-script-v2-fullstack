// auth.middleware.js

// va vérifier si un token a bien été fourni
// si oui, on continue la requête
// si pas de token, on arrête la requête et on met un code d'erreur


const jwtUtils = require('../../utils/jwt.utils');

const requireAuth = async (req, res, next) => {
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
        // On stocke le payload récupéré dans notre objet req afin de savoir à tout moment dans la suite de la requête qui est l'utilisateur·ice qui est à l'origine
        req.user = payload;
        // on ajoute cette info dans la requête en ajoutant une nouvelle propriété

        // on continue la requête
        next();
        
    } catch (err) {
        // ? Si le décodage a planté
        res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
    }
}

module.exports = requireAuth; 