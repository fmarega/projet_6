//---------------------------les routes pour se connecter ou créer un compte---------------//
//Lorsqu'un utilisateur tentera de se connecter, 
//nous utiliserons bcrypt pour créer un hash avec le mot de passe
// entré, puis le comparerons au hash stocké dans la base de données.

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//l'enregistrement des nouveaux utilisateurs
exports.signup = (req, res, next) => { 
    //pour hacher (crypter) le mdp
    bcrypt.hash(req.body.password, 10)  //nbr de fois on va hacher le mdp
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//la fonction login pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //vérification mail entré par l'utilisateur
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //comparaison mdp entré par l'utilisateur avec le hash enregistré dans la base de données
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },   //l'identifiant user pour etre sur que sa correspond au userId de l'utilisateur
                'RANDOM_TOKEN_SECRET',  //la chaîne secrète pour encoder mon token
                { expiresIn: '24h' }    //durée d'expiration du token
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};