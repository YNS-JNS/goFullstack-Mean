const mongoose = require('mongoose');

// ____________________________________________________________________________________
// améliore les messages d'erreur lors de l'enregistrement de données uniques:
const uniqueValidator = require('mongoose-unique-validator');
// ____________________________________________________________________________________

// ____________________________________________________________________________________
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail
userSchema.plugin(uniqueValidator);
// ____________________________________________________________________________________


module.exports = mongoose.model('User', userSchema);