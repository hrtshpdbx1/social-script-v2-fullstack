// scenario.validator.js

const yup = require('yup');

//On crée le model de validation pour le body du Scenario
const scenarioValidator = yup.object({
    title: yup.string().trim().required().min(3).max(50),
    context: yup.string().trim().required().min(3).max(200),
    characterName: yup.string().trim().required().min(2).max(50),
    characterDialogue: yup.string().trim().required().min(3).max(100),
    characterAvatarSeed: yup.string().trim().required().min(3).max(300),
    choices: yup.array().of(
        yup.object({
            responseText: yup.string().required(),
            reactionText: yup.string().required(),
            analysis: yup.string().required(),
            consequence: yup.string().required(),
            keyTakeaway: yup.string().required(),
        })
    ).min(3).max(3),

    difficultyId: yup.string().trim().required().matches(/^[0-9a-fA-F]{24}$/, 'Format ObjectId invalide'), // Regex -> cf. comment ci-dessous
    
    themeId: yup.string().trim().optional().matches(/^[0-9a-fA-F]{24}$/,  { message: 'Format ObjectId invalide', excludeEmptyString: true }),
    
// Validation conditionnelle pour newTheme
newTheme: yup.string().when('themeId', {
   is: (themeId) => !themeId, // Si themeId est vide, null ou undefined
        then: (schema) => schema.required("Le nouveau thème est obligatoire si aucun thème existant n'est sélectionné."),
        otherwise: (schema) => schema.optional()
})
    
}, [
    // Dépendance croisée (Bonne pratique Yup quand des champs dépendent l'un de l'autre)
    ['themeId', 'newTheme']
]);

module.exports = { scenarioValidator }

// ? Regex décryptée 
// ^ -> début de chaine
// {24} -> exactement 24 caractères
// [0-9a-fA-F] -> 0-9, a-f ou A-F 
// $ -> fin de chaine