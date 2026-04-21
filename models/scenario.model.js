const { Schema, Types, model } = require('mongoose');

// Sous schema, Embed : car les choix n'ont pas de vie en dehors de leur scénario,
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
        required: true
    }
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
                validator: function (arr) { return arr.length === 3; },
                message: 'Un scénario doit avoir 3 choix'
            }
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        difficultyId: {
            type: Schema.Types.ObjectId,
            ref: 'Difficulty',
            required: true,
        },

        themeId: {
            type: Schema.Types.ObjectId,
            ref: 'Theme',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },

        reviewedBy: {
            type: Types.ObjectId,
            ref: 'User',
            default: null
        },
        reviewedAt: {
            type: Date,
            default: null
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        collection: 'scenarios',
        timestamps: true
        /* Pour rajouter 2 champs automatiquement 
   - createdAt : date -> Pour savoir quand la category aura été créée
   - updatedAt : date -> Pour savoir quand la category a été modifiée pour la dernière fois */

    });

// On va créer un model à partir de ce schema
// Le premier paramètre et le nom du model, le deuxième, le schéma de ce model
const Scenario = model('Scenario', scenarioSchema);

// On export le model créé
module.exports = Scenario;
