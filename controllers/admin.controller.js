// admin.controller.js
const adminService = require("../services/admin.service");

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
            // Onè!  appelle le service pour chercher dans la DB
            const allReports = await adminService.find(filter);

            // On prépare notre objet JSON de réponse
            const dataToSend = {
                reports: allReports
            };

            // Si tout s'est bien passé, renvoie 200 et data
            res.status(200).json(dataToSend);

        } catch(err) {
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
            const reportId = req.params.reportId; // On réucpère l'iD des paramètres de l'URL (genre /reports/12345)
            const newReportsInfos = req.body; // corps de la requête
            const adminId = req.user.userId; // On récupère l'ID du user 

            //  aller chercher le report dans la DB
            const report = await adminService.findById(reportId)

            //vérifier si le report existe
            if (!report) {
                return next(errorUtils.create(404, 'L\'id ne correspond à aucun signalement'))
            }
            //si le signalement existe, on peut le modifier
            const updatedReport = await adminService.update(reportId, newReportsInfos, adminId);

            res.status(200).json(updatedReport);

        }catch (err) {
            console.error(err.stack);
            next(err);
        }
    }

}

module.exports = adminController


