// models/resourceCategory.model.js
const mongoose = require('mongoose');

const resourceCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Empêche les doublons dans ta DB
        enum: [
            'association / groupe de parole', 
            'podcast', 
            'livre', 
            'vidéo', 
            'site web',
            'réseaux sociaux',
            'discord / espace d\'échange',
            'article / essai',
            'outil pratique / guide',
            'professionnel·le de santé',
            'événement / conférence'
        ]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResourceCategory', resourceCategorySchema);