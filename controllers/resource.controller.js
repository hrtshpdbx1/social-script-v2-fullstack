const resourceService = require('../services/resource.service');
const errorUtils = require('../utils/error.utils');


 
const resourceController = {
    /**
     * GET /resource-categories/:categoryId/resources
     * Liste les ressources publiées pour une catégorie
     */
    getPublishedResourcesByCategory  : async (req, res, next) => {
        try {
            const { categoryId } = req.params;
            const resources = await resourceService.findByCategory(categoryId);
            res.status(200).json({ resources });
        } catch (err) {
            next(err);
        }
    },

    /**
     * GET /resources/:resourceId
     * Détail d'une ressource
     */
    getResourceById : async (req, res, next) => {
        try {
            const { resourceId } = req.params;
            const resource = await resourceService.findById(resourceId);
            
            if (!resource) {
                return next(errorUtils.create(404, 'Ressource introuvable'));
            }
            res.status(200).json(resource);
        } catch (err) {
            next(err);
        }
    },

    /**
     * 
     * POST /resources
     * Création d'une ressource (Admin)
     */
    insertResource: async (req, res, next) => {
        try {
            const newResource = await resourceService.create(req.body);
            res.status(201).json({
                message: 'Ressource créée avec succès',
                data: newResource
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * PATCH /resources/:id
     * Modification d'une ressource (Admin)
     */
     updateResource: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedResource = await resourceService.update(id, req.body);
            
            if (!updatedResource) {
                return next(errorUtils.create(404, 'Ressource introuvable'));
            }
            res.status(200).json(updatedResource);
        } catch (err) {
            next(err);
        }
    },

    /**
     * DELETE /resources/:id
     * Suppression d'une ressource (Admin)
     */
    deleteResource: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleted = await resourceService.delete(id);
            
            if (!deleted) {
                return next(errorUtils.create(404, 'Ressource introuvable'));
            }
            res.sendStatus(204); // 204 No Content (Standard pour un delete réussi)
        } catch (err) {
            next(err);
        }
    }
};

module.exports = resourceController;