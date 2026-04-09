const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName : {
            type : String,
            required : true,
            trim : true
        },
        lastName : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        password : {
            type : String,
            required : true,
            // todo: ⚠️ À hacher avec Argon2 avant save
        },
        role : {
            type : String,
            enum : ['user', 'moderator','admin'], 
            /* enum permet de donner une liste de chaines autorisées, si on encode autre chose -> erreur */
            default : 'User' 
            /* default permet de mettre une valeur par défaut, si on ne renseigne pas de role, ce sera User qui sera inséré */
        }
    }, 
    {
    
        timestamps : true
    });

const User = model('User', userSchema);

module.exports = User;