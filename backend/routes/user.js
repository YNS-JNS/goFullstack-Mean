const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// ____________________________________________________________________________________
// Signup:
router.post('/signup', userCtrl.signup);
// ____________________________________________________________________________________
// Login:
router.post('/login', userCtrl.login);

// ____________________________________________________________________________________
// Exporting modul:
module.exports = router;
// ____________________________________________________________________________________