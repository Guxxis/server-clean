import express from 'express';
import domainController from '../controllers/domainController.js';

const router = express.Router();

router.get('/domains', domainController.getAll);

export default router;