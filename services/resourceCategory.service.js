const ResourceCategory = require('../models/ressourceCategory.model');

const resourceCategoryService = {
    findAll: async () => {
        try {
            return await ResourceCategory.find();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};

module.exports = resourceCategoryService;