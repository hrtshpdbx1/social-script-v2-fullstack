// report.controller.js

const Report = require("../models/reports.model");
const Scenario = require("../models/scenario.model");
const scenarioService = require("../services/scenario.service");
const errorUtils = require("../utils/error.utils");

const reportController = {

    /**
    * Créer un report (demande de révision?)
    * @param { Request } req
    * @param { Response } res
    *  @param { Function } next
    */

    insert: async (req, res, next) => {
        try {
            const reportToAdd = req.body;
            const reporterId = req.user.id;      // pour la DB (ObjectId)
            const reporterEmail = req.user.email; // pour le message de réponse
            const reporterRole = req.user.role;
            const scenarioToReport = req.params.scenarioId; // on récupére le param de l'URL

            // On vérifie que le scenario existe
            if (!(await scenarioService.findById(scenarioToReport))) {
                return next(errorUtils.notFound('Ce scénario n\'existe pas'));
            };

            // On vérifie si le user n'a pas déjà signalé ce scenario
            const existingReport = await Report.findOne({
                reporterId: reporterId,
                scenarioId: scenarioToReport
            });

            if (existingReport) {
                return next(errorUtils.conflict('Vous avez déjà signalé ce scénario'));
            }

            const reportCreated = await new Report({
                ...reportToAdd,
                reporterId,
                scenarioId: scenarioToReport,
                status: 'pending'
            }).save();

            res.location(`/api/scenario/${scenarioToReport}/reports/${reportCreated._id}`);
            res.status(201).json({
                message: `Signalement de ${reporterEmail} (${reporterRole}) reçue`,
                data: reportCreated
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = reportController