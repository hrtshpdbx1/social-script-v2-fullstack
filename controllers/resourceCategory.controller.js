const resourceCategoryService = require('../services/resourceCategory.service');
const errorUtils = require('../utils/error.utils');

const resourceCategoryController = {
    /**
     * GET /resource-categories
     * Liste toutes les catégories disponibles
     */
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await resourceCategoryService.findAll();
            res.status(200).json({ categories });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = resourceCategoryController;