import express from 'express';
import domainController from '../controllers/domainController.js';

const router = express.Router();

router.get('/dominios', domainController.dominiosTodos);
router.get('/dominios/sitesProducao', domainController.dominiosProducao);
router.get('/dominios/sitesSuspensos', domainController.dominiosSuspensos);
router.get('/dominios/removerServidor', domainController.dominiosRemoverServidor);
router.get('/dominios/moverWeb', domainController.dominiosMoverWeb);
router.get('/dominios/moverUser', domainController.dominiosMoverUser);
router.get('/dominios/corrigirSense', domainController.dominiosCorrigirSenseIp);
router.get('/dominios/corrigirDns', domainController.dominiosCorrigirProductionIp);

export default router;