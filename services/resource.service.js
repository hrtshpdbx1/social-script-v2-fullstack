const Resource = require('../models/ressource.model');

const resourceService = {
    // PUBLIC : Trouver les ressources publiées d'une catégorie spécifique
    findByCategory: async (categoryId) => {
        try {
            return await Resource.find({ categoryId: categoryId, isPublished: true });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // PUBLIC / ADMIN : Trouver une ressource par son ID
    findById: async (id) => {
        try {
            return await Resource.findById(id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // ADMIN : Créer une ressource
    create: async (resourceData) => {
        try {
            const newResource = new Resource(resourceData);
            return await newResource.save();
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // ADMIN : Mettre à jour (ex: passer isPublished à true)
    update: async (id, updateData) => {
        try {
            return await Resource.findByIdAndUpdate(
                id, 
                updateData, 
                { returnDocument: 'after' }
            );
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // ADMIN : Supprimer une ressource définitivement (Hard delete)
    delete: async (id) => {
        try {
            return await Resource.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};

module.exports = resourceService;