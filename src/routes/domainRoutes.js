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

/**
 * @swagger
 * /domains/server/:server:
 *   get:
 *     summary: Lista de Dominios por Servidor
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/server/:server', auth, domainController.dominiosUmServidor);

/**
 * @swagger
 * /domains/inProduction:
 *   get:
 *     summary: Lista domínios em Produção
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/inProduction', auth, domainController.dominiosProducao);

/**
 * @swagger
 * /domains/inSuspension:
 *   get:
 *     summary: Lista domínios em Suspensão
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/inSuspension', auth, domainController.dominiosSuspensos);

/**
 * @swagger
 * /domains/inOnboarding:
 *   get:
 *     summary: Lista domínios em Onboarding
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/inOnboarding', auth, domainController.dominiosOnboarding);

/**
 * @swagger
 * /domains/toRemove:
 *   get:
 *     summary: Lista domínios para serem retirados do servidor
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/toRemove', auth, domainController.dominiosRemoverServidor);

/**
 * @swagger
 * /domains/toMoveWeb:
 *   get:
 *     summary: Lista domínios para mover para o web
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/toMoveWeb', auth, domainController.dominiosMoverWeb);

/**
 * @swagger
 * /domains/toFixDns:
 *   get:
 *     summary: Lista domínios com o IP diferente dos internos
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/toFixDns', auth, domainController.dominiosCorrigirProductionIp);

/**
 * @swagger
 * /domains/toFixCrm:
 *   get:
 *     summary: Lista domínios com o IP do CRM diferente do IP atual
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/toFixCrm', auth, domainController.dominiosCorrigirSenseIp);

/**
 * @swagger
 * /domains/toFixServer:
 *   get:
 *     summary: Lista domínios com o IP do servidor diferente do IP atual
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/toFixServer', auth, domainController.dominiosCorrigirServerIp);

/**
 * @swagger
 * /domains/sslExp:
 *   get:
 *     summary: Lista domínios com o SSL vencido ou preste a vencer
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/sslExp', auth, domainController.dominiosSslExpirando);

/**
 * @swagger
 * /domains/poteOuro:
 *   get:
 *     summary: Lista domínios com possibilidade de resgate
 *     tags: [Domínios]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de domínios
 */
router.get('/domains/poteOuro', auth, domainController.dominiosPoteOuro);

export default router;