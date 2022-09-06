const express = require('express');
const indexController = require('../controllers/index.controller');
const subsController = require('../controllers/subs.controller');
const router = express.Router();

const auth = require('../helpers/auth');

// INICIO:
router.get('/', indexController.renderIndex);
router.get('/nosotros', indexController.renderAbout);
// router.get('/', auth.updateExpirados, indexController.renderIndex);

// SUSCRIPTORES:
router.put('/evento/save-subs/:id', subsController.addSubs);
router.post('/subs/save-subs', subsController.addSubsGeneral);

module.exports = router;