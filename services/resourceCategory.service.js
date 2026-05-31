
const ResourceCategory = require('../models/ressourceCategory.model');


const resourceCategoryService = {
    findAll: async () => {
        try {
            return await ResourceCategory.find();
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    create: async (categoryData) => {
        try {
            const newCategory = new ResourceCategory(categoryData);
            return await newCategory.save();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};



module.exports = resourceCategoryService