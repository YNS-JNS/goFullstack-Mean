// ____________________________________________________________________________________
// Importation du modèle User:
const User = require('../models/User');
// ____________________________________________________________________________________
// Importing Package 'bcrypt'
// Importation du package 'bcrypt' pour le hachage de mot de passe:
const bcrypt = require('bcrypt');
// ____________________________________________________________________________________
// ____________________________________________________________________________________

// Importez la bibliothèque jsonwebtoken
const jwt = require('jsonwebtoken');
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Method signup:
// Méthode signup pour la création d'un nouvel utilisateur:
exports.signup = (req, res, next) => {
    // Nombre de "rounds" utilisés pour le hachage du mot de passe:
    const saltRounds = 10; // demandons de « saler » le mot de passe 10 fois
    // Methode pour crypter le password
    bcrypt.hash(req.body.password, saltRounds)
        .then(
            // Si le hachage est réussi
            hash => {
                // Création d'une instance du modèle User avec l'email et le mot de passe haché:
                const newUser = new User({
                    email: req.body.email,
                    password: hash
                });

                // Enregistrement du nouvel utilisateur dans la base de données:
                newUser.save()
                    .then(() => res.status(201).json({ message: 'User created successfully !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        // Si une erreur survient lors du hachage du mot de passe:
        .catch(error => res.status(500).json({ error }));
};
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Method login:
// Méthode login pour l'authentification d'un utilisateur existe dans la base de donnée:
exports.login = (req, res, next) => {
    // Recherche de l'utilisateur dans la base de données par son email:
    User.findOne({ email: req.body.email })
        // Dans le cas l'email existe dans la BBD:
        .then(
            user => {
                // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur 401.
                if (user === null) {
                    return res.status(401).json({ message: 'Incorrect login or password !' });
                }
                // Si l'utilisateur existe, then on doit faire la comparaison entre le mot de passe hashé entré et user.password hashé dans la base de donné viennent dans la meme chaine
                // Comparaison du mot de passe fourni avec le mot de passe haché de l'utilisateur.
                bcrypt.compare(req.body.password, user.password)
                    .then(
                        valid => {
                            // Si le password incorrect 
                            // Si la comparaison n'est pas valide, renvoyer une réponse d'erreur 401 (Unauthorized).
                            if (!valid) {
                               return res.status(401).json({ message: 'Incorrect login or password !' });
                            } else {
                                // Si le password correct
                                // Si les informations d'identification sont valides, renvoyer une réponse 200 avec un token.
                                res.status(200).json({
                                    userId: user._id,
                                    // Générez le token avec l'ID de l'utilisateur et une clé secrète
                                    token: jwt.sign( 
                                        { userId: user._id }, 
                                        'RANDOM_SECRET_KEY',
                                        { expiresIn: '24h' } // Le token expirera après 24 heures
                                    )
                                });
                            }
                        }
                    )
                    .catch(error => res.status(500).json({ error }));
            }
        )
        // Si une erreur survient lors du compare du mot de passe:
        .catch(error => res.status(500).json({ error }));
};
// ____________________________________________________________________________________