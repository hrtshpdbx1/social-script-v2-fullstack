
const themeService = require('../services/theme.service')

const themeController = {

    /**
*     /**
     * Récupérer les thèmes visibles par l'utilisateur courant.
     * - Visiteur non connecté : uniquement les thèmes 'approved'
     * - Utilisateur connecté : 'approved' + ses propres 'pending'
     * - Filtrage optionnel par difficulté via ?difficultyId=xxx
* @param { Request } req
* @param { Response } res
* @param { NextFunction } next
*/

    getAllThemes: async (req, res, next) => {
        try {
            //  Filtre de visibilité 
            const filter = {
                difficultyId: req.params.difficultyId,
                $or: [
                    { status: 'approved' },
                    { 
                        status: 'pending',
                        createdBy: req.user?._id
                    }
                ]
            };

            const themes = await themeService.find(filter);

            return res.status(200).json({ themes });
        } catch (err) {
            return next(err);
        }
    },

    insert: async (req, res, next) => {
        try {
            const themeToAdd = {
                ...req.body,
                difficultyId: req.params.difficultyId,  // ← récupéré depuis l'URL
                createdBy: req.user._id   //  depuis le token vérifié
            };
            const newTheme = await themeService.create(themeToAdd);

            res.status(201).json({
                message: "Nouveau thème proposé avec succès. En attente de validation.",
                data: newTheme
            });
        } catch (err) {
             return next(err);
        }
    }



}

module.exports = themeController