// admin.service.js

const Report = require('../models/reports.model');

const adminService = {

    find: async (filter, fields = null) => {
        try {
            const reports = await Report.find(filter).select(fields)

            return reports
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },


    findById: async (id) => {
        try {
            const report = await Report.findById(id)
            return report;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    update: async (reportId, newInfos, adminId) => {
        // On reçoit l'ID du report, les nouvelles infos, et l'ID de l'admin 
        try {
            const updatedReport = await Report.findByIdAndUpdate(
                reportId, // 1er paramètre : l'ID de ce qu'on veut modifier
                // Ajout nouvelles valeurs
                {
                    ...newInfos,
                    reviewedBy: adminId,
                    reviewedAt: new Date()
                },
                { new: true }       //  pour renvoyer le document MODIFIÉ,(renvoie l'ancien par défaut)
            );
            return updatedReport
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }

    }
}


module.exports = adminService