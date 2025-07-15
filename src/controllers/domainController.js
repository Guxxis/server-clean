import { domain } from '../models/Domain.js';

const ips = ['169.57.141.90', '169.57.169.70', '169.57.169.72', '169.57.141.85', '169.57.169.85', '169.57.169.91', '169.57.141.94', '169.57.169.74', '169.57.169.83', '169.57.169.77', '169.57.169.73'];
class domainsController {

    static async dominiosTodos(req, res) {
        try {
            const domains = await domain.find();
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosProducao(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: {$in: ['Monitoramento', 'Renovação']},
                server_suspended: false
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosSuspensos(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: {$in: ['Monitoramento', 'Renovação']},
                server_suspended: true
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosOnboarding(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: 'Onboarding'
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosRemoverServidor(req, res) {
        try {
            const domains = await domain.find({
                sense_status: false,
                production_ip: { $nin: ips }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosMoverWeb(req, res) {
        try {
            const domains = await domain.find({
                sense_status: false,
                server_user: { $nin: ['admin'] },
                production_ip: { $in: ips }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosMoverUser(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                server_user: 'admin',
                production_ip: { $in: ips }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosCorrigirSenseIp(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: {$nin: ['Monitoramento', 'Renovação']},
                production_ip: { $in: ips },
                $expr: { $ne: ['$production_ip', '$sense_ip'] }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosCorrigirProductionIp(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: {$nin: ['Monitoramento', 'Renovação']},
                production_ip: { $nin: ips }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosPoteOuro(req, res) {
        try {
            const domains = await domain.find({
                sense_status: false,
                server_suspended: false,
                server_user: {$nin: ['admin']},
                production_ip: { $in: ips }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosSslExpirando(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                server_user: {$nin: ['admin']},
                production_ip: { $in: ips },
                ssl_days: {$lt: 10}
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };
};

export default domainsController;