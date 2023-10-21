// Importation de la bibliothèque jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        // Extraction du token de l'en-tête 'Authorization' de la requête
        const token = req.headers.authorization.split(' ')[1];

        // Vérification et décodage du token à l'aide de la clé secrète 'RANDOM_TOKEN_SECRET'
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');

        // Extraction de l'identifiant d'utilisateur (userId) du token décodé
        const userId = decodedToken.userId;

        // Ajout des informations d'authentification à l'objet 'req' pour une utilisation ultérieure
        // Par exemple, cela permettra à d'autres middleware ou routes d'accéder à l'ID de l'utilisateur authentifié
        req.auth = { // Cette ligne crée un nouvel objet auth dans l'objet de requête (req) et lui attribue une propriété userId contenant la valeur de l'identifiant de l'utilisateur.
            userId: userId
        }
        // Passez au middleware ou à la route suivante
        next();

    } catch (error) {
        // En cas d'erreur lors de la vérification du token ou de l'extraction de l'ID utilisateur
        // Répondez avec un statut 401 (non autorisé) et un objet JSON contenant l'erreur
        res.status(401).json({ error });
    }
};