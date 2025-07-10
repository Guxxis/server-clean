const express = require('express');
const domainController = require('../controllers/domainController.js');
const router = express.Router();

// router.post('/domains', domainController.creat);
router.get('/domains', domainController.getAll);
router.get('/domains/busca', domainController.getDomain);
router.get('/domains/:id', domainController.getId);

module.exports = router;