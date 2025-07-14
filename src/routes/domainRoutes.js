import express from 'express';
import domainController from '../controllers/domainController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/domains', auth, domainController.dominiosTodos);
router.get('/domains/inProduction', auth, domainController.dominiosProducao);
router.get('/domains/inSuspension', auth, domainController.dominiosSuspensos);
router.get('/domains/toRemove', auth, domainController.dominiosRemoverServidor);
router.get('/domains/toMoveWeb', auth, domainController.dominiosMoverWeb);
router.get('/domains/toMoveUser', auth, domainController.dominiosMoverUser);
router.get('/domains/toFixCrm', auth, domainController.dominiosCorrigirSenseIp);
router.get('/domains/toFixDns', auth, domainController.dominiosCorrigirProductionIp);
router.get('/domains/poteOuro', auth, domainController.dominiosPoteOuro);

export default router;