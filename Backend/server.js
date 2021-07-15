//-----------créattion serveur node----------------
// là j'importe le package http natif de node et l'utilisé pour créer un serveur
const http = require('http');
//importation de mon appli
const app = require('./app');

//la fonction qui envoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Pour dire au serveur quel port il va touner
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//cette fonction cherche les differentes erreurs et les gère de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//la fonction va recevoir la requete et la reponse et qui va les modifier
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


//configuration du serveur pour qu'il écoute la variable d'environnement du port
server.listen(port);
