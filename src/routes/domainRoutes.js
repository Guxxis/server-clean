import express from 'express';
import domainController from '../controllers/domainController.js';

const router = express.Router();

router.get('/domains', domainController.dominiosTodos);
router.get('/domains/inProduction', domainController.dominiosProducao);
router.get('/domains/inSuspension', domainController.dominiosSuspensos);
router.get('/domains/toRemove', domainController.dominiosRemoverServidor);
router.get('/domains/toMoveWeb', domainController.dominiosMoverWeb);
router.get('/domains/toMoveUser', domainController.dominiosMoverUser);
router.get('/domains/toFixCrm', domainController.dominiosCorrigirSenseIp);
router.get('/domains/toFixDns', domainController.dominiosCorrigirProductionIp);
router.get('/domains/poteOuro', domainController.dominiosPoteOuro);

export default router;