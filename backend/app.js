const express = require('express');
const path = require('path');

const app = express();

// ____________________________________________________________________________________
// Importing stuff router
const stuffRoutes = require('./routes/stuff');
// Importing user router
const userRoutes = require('./routes/user');
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Importing Mongoose package:
const mongoose = require('mongoose');
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Connecting to MongoDb Atlas:
const uri = 'mongodb+srv://admin:admin123@cluster0.g5eufe0.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))
// ____________________________________________________________________________________


// ____________________________________________________________________________________
// Utiliser le middleware express.json() pour analyser les données JSON des requêtes: est utilisée dans une application Express.js pour activer le middleware qui analyse les données JSON provenant du corps des requêtes HTTP. Cela permet à votre application d'accepter des données JSON dans les requêtes POST, PUT et PATCH.
app.use(express.json());
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Erreurs de CORS 
// On utilise ce code pour gérer les problèmes de CORS (Cross-Origin Resource Sharing):  Cela permet à votre application front-end de communiquer avec votre serveur Express.js, même si les origines sont différentes. Cela est particulièrement utile lors du développement d'API ou d'applications à architecture distribuée.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Affectation stuffRoutes to /api/stuff
app.use('/api/stuff', stuffRoutes);

// Affectation userRoutes to /api/auth
// app.use('/api/auth', userRoutes);
app.use('/api/auth', userRoutes);

// Définition du middleware pour servir des fichiers statiques depuis le dossier "images"
app.use('/images', express.static(path.join( __dirname, 'images' )));

// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Exportation:
module.exports = app;
// ____________________________________________________________________________________

// // ____________________________________________________________________________________
// // --- Get :
// app.get('/api/stuff', (req, res, next) => {
//     const stuff = [
//         {
//             _id: 'oeihfzeoi',
//             title: 'Mon premier objet',
//             description: 'Les infos de mon premier objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//             price: 4900,
//             userId: 'qsomihvqios',
//         },
//         {
//             _id: 'oeihfzeomoihi',
//             title: 'Mon deuxième objet',
//             description: 'Les infos de mon deuxième objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//             price: 2900,
//             userId: 'qsomihvqios',
//         },
//     ];

//     res.status(200).json(stuff);
//     // next();
// });
// // ____________________________________________________________________________________