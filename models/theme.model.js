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
    }
},
    {
    
        timestamps: true

    });


const Theme = model('Theme', themeSchema);

module.exports = Theme 