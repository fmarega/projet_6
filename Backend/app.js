//emportation de express
const express = require('express');
//importation de body-parser
const bodyParser = require('body-parser');
// importation de mongoose
const mongoose = require('mongoose');
//il me donne accée au chemin de mon systeme de fichier
const path = require('path');

//importation de mon routeur
const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');
//----------------------Connection de mon API à mon cluster MongoDB-----------------------------
mongoose.connect('mongodb+srv://fmarega:F16mai1997M@cluster0.wgeld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

//j'ai appellé express pour créer mon appli express
const app = express();

//------------------------le middleware------------------------
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//accée a notre API depuis n'importe quelle origine
    //l'ajout des headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //envoyer des requetes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', stuffRoutes);
//la route attendue par le frontend
app.use('/api/auth', userRoutes);

// là j'ai exporté mon appli pourque je puisse accéder depuis les autres fichiers notamment mon serveur node 
module.exports = app;