const { Schema, model } = require('mongoose');

const difficultySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,

    },
    order: {
        type: Number,
        unique: true,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
},
    {
    
        timestamps: true
    });

const Difficulty = model('Difficulty', difficultySchema);

module.exports = Difficulty