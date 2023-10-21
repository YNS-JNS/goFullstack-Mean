// Importer le module HTTP intégré de Node.js
const http = require('http');
// Importer l'application Express depuis le fichier 'app.js'
const app = require('./app');

// ____________________________________________________________________________________
// Fonction pour normaliser le port en un nombre ou une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10); // Conversion de la valeur en nombre

  if (isNaN(port)) { // isNaN : is Not a Number
    return val; // Retourner la valeur non numérique telle quelle
  }
  if (port >= 0) {
    return port; // Retourner le port s'il est positif
  }
  return false; // Retourner faux pour les valeurs négatives
};
// ____________________________________________________________________________________

// ____________________________________________________________________________________

// Sélectionner le port à partir de la variable d'environnement ou utiliser le port 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Définir le port de l'application Express
app.set('port', port);
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Fonction de gestionnaire d'erreur pour les problèmes de serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error; // Lancer l'erreur si ce n'est pas lié à la mise en écoute du serveur
  }
  const address = server.address(); // Obtenir l'adresse du serveur
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  // Gérer différents codes d'erreur
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1); // Quitter l'application avec un code d'échec
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error; // Lancer une erreur pour les autres codes d'erreur
  }
};
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Créer le serveur HTTP en utilisant l'application Express
const server = http.createServer(app);
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Gérer les erreurs du serveur en utilisant la fonction errorHandler
server.on('error', errorHandler);
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Événement "listening" - le serveur est en cours d'écoute
server.on('listening', () => {
  const address = server.address(); // Obtenir l'adresse du serveur
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
// ____________________________________________________________________________________

// ____________________________________________________________________________________
// Démarrer le serveur en écoutant sur le port spécifié
server.listen(port);
// ____________________________________________________________________________________
