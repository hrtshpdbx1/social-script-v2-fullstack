const { Schema, model, Types } = require('mongoose');

// SousSchema, Embed : car les choix n'ont pas de vie en dehors de leur scénario,
const choiceSchema = new Schema({
    responseText: {
    type: String,
    required: true
},
    reactionText: {
    type: String,
    required: true
},
    analysis: {
    type: String,
    required: true
},
    consequence: {
    type: String,
    required: true
},
    keyTakeaway: {
    type: String,
    required: true}
},
    { _id: false });


// On créé un schema qui va décrire à quoi ressemble une categorie
// Schema( { description objet }, { options collection } )
const scenarioSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        context: {
            type: String,
            required: true,
            trim: true
        },
        characterName: {
            type: String,
            required: true,
            trim: true
        },
        characterDialogue: {
            type: String,
            required: true,
            trim: true
        },
        characterAvatarSeed: {
            type: String,
        },
        choices: {
            type: [choiceSchema],
            validate: {
                validator: function (arr) { return arr.length ===  3; },
                message: 'Un scénario doit avoir 3 choix'
            }
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        authorId: {
            type: Types.ObjectId,
            ref: 'User',  /* Pour créer une référence vers le model User */
            required: false, // pour phase dev
        },
        difficultyId: {
            type: Types.ObjectId,
            ref: 'Difficulty',
            required: true,
        },
        themeId: {
            type: Types.ObjectId,
            ref: 'Theme',
            required: true,
        }
    },
    {
        collection: 'scenarios',
        timestamps: true
    });

// On va créer un model à partir de ce schema
// Le premier paramètre et le nom du model, le deuxième, le schéma de ce model
const Scenario = model('Scenario', scenarioSchema);

// On exporet le model créé
module.exports = Scenario;
