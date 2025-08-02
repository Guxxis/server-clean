import { domain } from '../models/Domain.js';
import servers from '../src/utils/servers.json' assert { type: 'json'};

const ips = servers.map(servers => servers.ip);
class domainsController {

    static async dominiosTodos(req, res) {
        try {
            const domains = await domain.find();
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosUmServidor(req, res) {
        const servidor = req.params.server
        try {
            const domains = await domain.find({server_ip: servidor});
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

    static async dominiosCorrigirProductionIp(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: {$in: ['Monitoramento', 'Renovação']},
                production_ip: { $nin: ips }
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
                sense_stage: {$in: ['Monitoramento', 'Renovação']},
                production_ip: { $in: ips },
                $expr: { $ne: ['$production_ip', '$sense_ip'] }
            });
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };

    static async dominiosCorrigirServerIp(req, res) {
        try {
            const domains = await domain.find({
                sense_status: true,
                sense_stage: {$in: ['Monitoramento', 'Renovação']},
                production_ip: { $in: ips },
                $expr: { $ne: ['$production_ip', '$server_ip'] }
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