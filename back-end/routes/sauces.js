const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauces);
router.post('/', auth, multer, sauceCtrl.postSauces);
router.put('/:id', auth, multer, sauceCtrl.modifySauces);
router.delete('/:id', auth, sauceCtrl.deleteSauces);
router.post('/:id/like', auth, sauceCtrl.likeSauces);

module.exports = router;