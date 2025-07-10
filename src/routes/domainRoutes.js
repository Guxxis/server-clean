const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController.js');

router.post('/domains', domainController.creat);
router.get('/domains', domainController.getAll);
router.get('/domains/busca', domainController.getDomain);
router.get('/domains/:id', domainController.getId);
router.delete('/domains', domainController.deleteAll);

module.exports = router;