// theme.model.js 

const { Schema, Types, model } = require('mongoose');


const themeSchema = new Schema({
    title: {
        type: String,
        required: true,
        // ne doit pas être unique car actuellement un theme peut exister en facile et en difficile
    },

    description: {
        type: String
    },

    icon: {
        type: String,
        required: true,
    },

    difficultyId: {
        type: Types.ObjectId,
        ref: 'Difficulty', //Pour créer une référence vers le model Dif 
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // En attente par défaut à la création
    },

    reviewedBy: {
        type: Types.ObjectId,
        ref: 'User',
        default: null
    },

    reviewedAt: {
        type: Date,
        default: null
    }
},
    {

        timestamps: true

    });


const Theme = model('Theme', themeSchema);

module.exports = Theme 