const express = require('express');
const indexController = require('../controllers/index.controller');
const subsController = require('../controllers/subs.controller');
const router = express.Router();

const auth = require('../helpers/auth');

router.get('/', auth.updateExpirados, indexController.renderIndex);
// router.post('/', indexController.updateExpirados);
router.get('/nosotros', indexController.renderAbout);

// Suscrpciones:
router.put('/evento/save-subs/:id', subsController.addSubs);
router.post('/subs/save-subs', subsController.addSubsGeneral);

module.exports = router;