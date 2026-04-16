// utils/error.utils.js

/**
 * Utilitaire pour générer des erreurs formatées pour le middleware de gestion globale
 * @param {number} status - Le code de statut HTTP (401, 404, 500, etc.)
 * @param {string} message - Le message d'erreur à renvoyer
 * @returns {Error} - L'objet erreur enrichi
 */
const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    error.isOperational = true; // Indique que c'est une erreur prévue (validation, auth) et non un crash
    return error;
};

// On peut aussi exporter des raccourcis pour les erreurs fréquentes
const errorUtils = {
    create: createError,
    badRequest: (msg = 'Requête incorrecte') => createError(400, msg),
    unauthorized: (msg = 'Vous devez être connecté·e') => createError(401, msg),
    forbidden: (msg = 'Accès interdit') => createError(403, msg),
    notFound: (msg = 'Ressource non trouvée') => createError(404, msg),
    conflict: (msg = 'Cette ressource existe déjà') => createError(409, msg),
    internal: (msg = 'Erreur interne du serveur') => createError(500, msg)
};

module.exports = errorUtils;