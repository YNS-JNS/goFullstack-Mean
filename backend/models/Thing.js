const mongoose = require('mongoose');

// ____________________________________________________________________________________
// Créez un schéma Thing: La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB
const thingShema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});
// ____________________________________________________________________________________


// ____________________________________________________________________________________
// Exportation du model pour le rendre disponible dans notre application Express
module.exports = mongoose.model('Thing', thingShema); // La méthode  model  transforme ce modèle en un modèle utilisable
// ____________________________________________________________________________________

// NB :-------------------------------------------------------------------------------------------------------
// Les méthodes de votre modèle Thing permettent d'interagir avec la base de données :

// save()  – enregistre un Thing ;

// find()  – retourne tous les Things ;

// findOne()  – retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).
// ----------------------------------------------------------------------------------------------------------
