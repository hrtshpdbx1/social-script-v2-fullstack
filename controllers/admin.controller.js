// admin.controller.js
const adminService = require("../services/admin.service");
const scenarioService = require("../services/scenario.service");
const themeService = require("../services/theme.service");
const errorUtils = require("../utils/error.utils");

const adminController = {

    /**
     * Liste tous les reports, filtrable par status. 
    * @param { Request } req
    * @param { Response } res
    * @param { Function } next
    */

    getAllReports: async (req, res, next) => {
        try {
            // Extraction du params status repuis la query 
            // ex : /reports?status=pending 
            const { status } = req.query;

            const filter = {}; // création filtre, objet vide au debut

            // Si l'utilisateur a mis un status dans l'URL, on l'ajoute au filtre
            if (status) {
                filter.status = status;
            }
            // On appelle le service pour chercher dans la DB
            const allReports = await adminService.find(filter);

            // On prépare notre objet JSON de réponse
            const dataToSend = {
                reports: allReports
            };

            // Si tout s'est bien passé, renvoie 200 et data
            res.status(200).json(dataToSend);

        } catch (err) {
            console.error(err.stack);
            next(err);
        }
    },

    /**
     * Modifie les infos d'un repport
     * Permet à un modérateur de changer le status d'un report (`reviewed` ou `dismissed`). 
    * @param { Request } req
    * @param { Response } res
    * @param { Function } next
    */

    updateReportStatus: async (req, res, next) => {
        try {
            const reportId = req.params.reportId; // On récupère l'iD des paramètres de l'URL (genre /reports/12345)
            const newReportsInfos = req.body; // corps de la requête
            const adminId = req.user.id; // On récupère l'ID du user 

            //  aller chercher le report dans la DB
            const report = await adminService.findById(reportId)

            //vérifier si le report existe
            if (!report) {
                return next(errorUtils.create(404, 'L\'id ne correspond à aucun signalement'))
            }
            //si le signalement existe, on peut le modifier
            const updatedReport = await adminService.update(reportId, newReportsInfos, adminId);

            res.status(200).json(updatedReport);

        } catch (err) {
            console.error(err.stack);
            next(err);
        }
    },

    /**
     * Liste les scénarios en attente de validation. 
    * @param { Request } req
    * @param { Response } res
    * @param { Function } next
    */

    getAllScenariosPending: async (req, res, next) => {
        try {
            const filter = { status: 'pending' };
            const scenariosPending = await scenarioService.find(filter);

            const dataToSend = {
                scenarios: scenariosPending
            }
            res.status(200).json(dataToSend);
        } catch (err) {
            console.error(err.stack);
            next(err);
        }
    },

    /**
     * Modifie le status d'un scenario
     * permet à un modérateur de passer un scénario à `approved` ou `rejected`. Same deal avec `reviewedBy` / `reviewedAt`. 
    * @param { Request } req
    * @param { Response } res
    * @param { Function } next
    */

    updateScenarioStatus: async (req, res, next) => {
        try {
            const scenarioId = req.params.scenarioId;
            const newScenarioStatus = req.body;
            const adminId = req.user.id
            const scenario = await scenarioService.findById(scenarioId)

            if (!scenario) {
                return next(errorUtils.create(404, 'Vous essayez de modifier un scenario qui n\'existe pas (ID inconnue)'))
            }
            const updatedScenario = await scenarioService.update(scenarioId, newScenarioStatus, adminId);
            res.status(200).json(updatedScenario);

        } catch (err) {
            console.error(err.stack);
            next(err);
        }

    }, 
    /**
     * Liste les thèmes en attente de validation. 
     */
    getAllThemesPending: async (req, res, next) => {
        try {
            const filter = { status: 'pending' };
            const themesPending = await themeService.find(filter); // Réutilise la méthode find existante !
            
            res.status(200).json({ themes: themesPending });
        } catch (err) {
            next(err);
        }
    },

    /**
     * Modifie le status d'un thème (approuver/rejeter)
     */
    updateThemeStatus: async (req, res, next) => {
        try {
            const themeId = req.params.themeId;
            const newThemeStatus = req.body;
            const adminId = req.user.id;
            // ⚠️ ne pas mettre req.user.userId; 

            const theme = await themeService.findById(themeId);
            if (!theme) {
                return next(errorUtils.create(404, 'Ce thème n\'existe pas'));
            }

            const updatedTheme = await themeService.update(themeId, newThemeStatus, adminId);
            res.status(200).json(updatedTheme);
        } catch (err) {
            next(err);
        }
    }


}

module.exports = adminController


