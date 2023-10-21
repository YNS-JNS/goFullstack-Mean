const express = require('express');
// ____________________________________________________________________________________
// Importation auth middleware:
const auth = require('../middleware/auth');
// ____________________________________________________________________________________

// ajoutons notre middleware multer:
const multer = require('../middleware/multer-config');

// ____________________________________________________________________________________
// Instanciation router method
const router = express.Router();
// ____________________________________________________________________________________
// ____________________________________________________________________________________
// Importing Controller Stuff: qui contient toutes nos logiques nécessaire
const stuffCtrl = require('../controllers/stuff');
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// --- POST : Enregistrement des Things dans la base de données
router.post('/', auth, multer, stuffCtrl.createThing);
// ____________________________________________________________________________________
// --- Get : Récupération de la liste de Things en vente
router.get('/', auth, stuffCtrl.getAllStuff);
// ____________________________________________________________________________________
// --- Get : Récupération d'un Thing spécifique
router.get('/:id', auth, stuffCtrl.getOneThing);
// ____________________________________________________________________________________
// --- Update : Mettez à jour un Thing existant
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
// ____________________________________________________________________________________
// --- Delete :
router.delete('/:id', auth, stuffCtrl.deleteThing);
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Exporting modul:
module.exports = router;
// ____________________________________________________________________________________