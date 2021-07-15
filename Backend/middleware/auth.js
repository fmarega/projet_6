//------- Création d'un middleware qui verifie le token envoyer par l'appli frontend --------

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {//nous avons split au tour de l'espace et ça va nous retourner Bearer en 1ére elt header en 2éme elt. 
    const token = req.headers.authorization.split(' ')[1];  //décodé le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //verification du token
    const userId = decodedToken.userId; //recuperation l'userId du token
    if (req.body.userId && req.body.userId !== userId) {    //verification du userId dans le token
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch { //Les erreurs générées dans try s'afficheront ici dans le bloc catch 
    res.status(401).json({  // erreurs d'autentification 
      error: new Error('Invalid request!')
    });
  }
};