const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/sauces');

//---------------- fonctions des routes --------------

router.get('/', auth, stuffCtrl.getAllSauces);               //Récupération de toutes les sauces
router.post('/', auth, multer, stuffCtrl.createSauce);      //Créer une nouvelle sauce
router.get('/:id', auth, stuffCtrl.getOneSauce);            //Recuperation d'une seule sauce
router.put('/:id', auth, multer, stuffCtrl.modifySauce);    //modification d'une sauce 
router.delete('/:id', auth, stuffCtrl.deleteSauce);         //Suppression d'une sauce
router.post('/:id/like', auth, stuffCtrl.likeSauce);       //Les likes

module.exports = router;