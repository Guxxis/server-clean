import express from 'express';
import domainController from '../controllers/domainController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /domains:
 *   get:
 *     summary: Lista todos os domínios
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains', auth, domainController.dominiosTodos);

router.get('/domains/server/:server', auth, domainController.dominiosUmServidor);
router.get('/domains/inProduction', auth, domainController.dominiosProducao);
router.get('/domains/inSuspension', auth, domainController.dominiosSuspensos);
router.get('/domains/inOnboarding', auth, domainController.dominiosOnboarding);
router.get('/domains/toRemove', auth, domainController.dominiosRemoverServidor);
router.get('/domains/toMoveWeb', auth, domainController.dominiosMoverWeb);
router.get('/domains/toFixDns', auth, domainController.dominiosCorrigirProductionIp);
router.get('/domains/toFixCrm', auth, domainController.dominiosCorrigirSenseIp);
router.get('/domains/toFixServer', auth, domainController.dominiosCorrigirServerIp);
router.get('/domains/sslExp', auth, domainController.dominiosSslExpirando);
router.get('/domains/poteOuro', auth, domainController.dominiosPoteOuro);

export default router;