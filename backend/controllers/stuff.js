// Importation Model Thing
const Thing = require('../models/Thing');

const fs = require('fs');

// ____________________________________________________________________________________

// Récupération de la liste de Things en vente
exports.getAllStuff = (req, res, next) => {

    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
    // next();
};
// ____________________________________________________________________________________

// Enregistrement des Things dans la base de données
exports.createThing = (req, res, next) => {

    // Parsing de l'objet JSON contenu dans la requête ( Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data et non sous forme de JSON. Le corps de la requête contient une chaîne thing, qui est simplement un objetThing converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable. )
    const thingObject = JSON.parse(req.body.thing);

    // Suppression des propriétés _id et _userId de l'objet (si elles existent)
    delete thingObject._id;
    delete thingObject.userId; // ???? userId not _userId
    // delete thingObject._userId; // ???? userId not _userId

    // Création d'une nouvelle instance de Thing en utilisant les données de l'objet thingObject
    const newThing = new Thing({
        ...thingObject,
        userId: req.auth.userId, // Attribution de l'ID de l'utilisateur connecté // ???? userId not _userId
        // _userId: req.auth.userId, // Attribution de l'ID de l'utilisateur connecté // ???? userId not _userId
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Construction de l'URL de l'image
    });

    // Enregistrement de l'objet Thing dans la base de données
    newThing.save()
        .then(() => res.status(201).json({ message: 'Post saved successfully !' }))
        .catch((error) => res.status(400).json({ error }));
    // next();
};

// ____________________________________________________________________________________

// Récupération d'un Thing spécifique
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};
// ____________________________________________________________________________________

// Mettez à jour un Thing existant
// Middleware pour modifier un objet (thing) existant
exports.modifyThing = (req, res, next) => {
    // on crée un objet thingObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance Thing à partir de thingObject, puis on effectue la modification. Nous avons auparavant, comme pour la route POST, supprimé le champ _userId envoyé par le client afin d’éviter de changer son propriétaire et nous avons vérifié que le requérant est bien le propriétaire de l’objet.
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    // Supprimer la propriété userId de l'objet "thingObject"
    // supprimé le champ userId envoyé par le client afin d’éviter de changer son propriétaire et nous avons vérifié que le requérant est bien le propriétaire de l’objet.
    delete thingObject.userId;
    // Rechercher l'objet "thing" à modifier par son ID
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            // Vérifier si l'utilisateur authentifié a l'autorisation de modifier cet objet
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized !' });
                console.log('Not authorized !');
            } else {
                // Mettre à jour l'objet "thing" avec les nouvelles données
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'Thing updated successfully !' });
                        console.log('Product updated successfully !');

                    })
                    .catch(error => {
                        res.status(401).json({ error })
                    });
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });

};
// ____________________________________________________________________________________

// Delete Thing
exports.deleteThing = (req, res, next) =>{

    Thing.findOne({ _id: req.params.id })
        .then( (thing)=>{
            if (thing.userId != req.auth.userId) {
                // Vérifier si l’utilisateur qui a fait la requête de suppression est bien celui qui a créé le Thing
                res.status(401).json({ message: 'Not authorized !' });
                console.log('Not authorized :(');
            }else{
                // Extract file name
                const fileName = thing.imageUrl.split('/images/')[1];
                // Delete image by fs package
                fs.unlink(`images/${fileName}`, ()=>{
                    Thing.deleteOne({ _id: req.params.id })
                    .then(()=> {
                        res.status(200).json({ message: 'Deleted successfully !' });
                        console.log('Deleted successfully :)');
                    })
                    .catch(error => res.status(401).json({error}));
                });
            }
        } )
        .catch(error => res.status(500).json({error}));
};
// ____________________________________________________________________________________




// #####################################################################################
//          --- --- --- --- Avant d'utiliser 'multer' --- --- --- ---

// ____________________________________________________________________________________

/* -- Before using multer package : --
________________________________________________________________________________________
exports.createThing = (req, res, next) => {
// Deleting _id submited from frontEnd (car MongoDb va générer automatiquement un ID)
delete req.body._id;
// Persister les données
const thing = new Thing({
    ...req.body // Spread Operator
});

// const thing = new Thing({
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   });

// Enregistrer les données dans notre DataBase using save() method
thing.save()
    .then(() => res.status(201).json({ message: 'Post saved successfully !' }))
    .catch((error) => res.status(400).json({ error }));
// next();
};
*/

// ____________________________________________________________________________________

// ____________________________________________________________________________________
/*
// Mettez à jour un Thing existant
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Thing updated successfully !' }))
        .catch(error => res.status(400).json({ error }));
};
// ____________________________________________________________________________________

// Delete Thing
// exports.deleteThing = (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Deleted !' }))
//         .catch(error => res.status(400).json({ error }));
// };
*/

// ____________________________________________________________________________________
