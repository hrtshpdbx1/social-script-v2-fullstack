// scenario-validation.js

const scenarioValidation = (yupValidator) => {
    return async(req, res, next) => {

    //On essaie de passer la validation
    try {
        //Si on arrive ici depuis la route /api/category/ :
        //yupValidator contient notre categoryValidator, donc on va déclencher la validation
        //sur notre categoryValidator
        const validData = await yupValidator.validate(req.body, { abortEarly: false });
        // req.body contient l'objet json qu'on essaie d'insérer ou de modifier (en post ou put)
        //Par contre req.body lui, contient toujours une valeur pour patate, 
        //on remplace donc le body de la request par validData
        req.body = validData;
        //On continue la requête
        next();
    } 
    catch (err) {
       console.log(err)
        return res.sendStatus(400); //Bad Request
    }
}

}

module.exports = scenarioValidation; 