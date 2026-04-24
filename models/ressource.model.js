// models/resource.model.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: false 
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResourceCategory', 
        required: true
    },
    theme: {
        type: String,
        required: true,
        enum: [
            'validisme', 
            'communauté', 
            'féminisme', 
            'pour débuter',
            'intersectionnalité',
            'santé mentale & bien-être',
            'diagnostic & cheminement',
            'milieu professionnel / études',
            'vie quotidienne & outils',
            'vulgarisation scientifique',
            'parentalité / proches'
        ]
    },
    language: {
        type: String,
        required: true,
        enum: ['anglais', 'français', 'néerlandais', 'allemand']
    },
    location: {
        type: String,
        required: false, // Optionnel 
        enum: [
            'Belgique', 
            'France', 
            'Suisse', 
            'Québec', 
            'International / En ligne'
        ]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    link1: {
        type: String,
        required: true // lien principal obligatoire
    },
    link2: {
        type: String,
        required: false // lien secondaire
    },
    isPublished: {
        type: Boolean,
        default: false 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);