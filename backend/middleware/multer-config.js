// Importation du module 'multer' pour gérer les téléchargements de fichiers
const multer = require('multer');
// ____________________________________________________________________________________

// Définition des types MIME et de leurs extensions correspondantes pour les images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// ____________________________________________________________________________________

// Configuration du stockage des fichiers téléchargés
const storage = multer.diskStorage({

    // Définition du dossier de destination où les images seront enregistrées
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // Génération du nom de fichier pour le stockage
    filename: (req, file, callback) => {
        // Remplacement des espaces dans le nom de fichier par des underscores
        const name = file.originalname.split(' ').join('_');
        // Récupération de l'extension du fichier à partir des types MIME
        const extension = MIME_TYPES[file.mimetype]; // NB: extension = MIME_TYPES[file.mimetype]: Cette ligne utilise le type MIME du fichier téléchargé comme clé pour accéder à l'objet MIME_TYPES et récupérer l'extension correspondante. Par exemple, si file.mimetype est 'image/jpeg', alors extension deviendra 'jpg'.
        // Construction du nom de fichier final avec horodatage pour éviter les conflits
        callback(null, name + Date.now() + '.' + extension);
    }
});

// ____________________________________________________________________________________

// Exportation du middleware configuré avec les options de stockage
// Il utilisera le stockage défini pour gérer les fichiers téléchargés un par un (single)
module.exports = multer({ storage: storage }).single('image');