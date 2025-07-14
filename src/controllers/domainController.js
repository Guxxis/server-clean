import { domain } from '../models/Domain.js';

class domainsController {
    static async getAll(req, res) {
        try {
            const domains = await domain.find();
            res.json(domains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    };
};

// exports.creat = async (req, res) => {
//     try {
//         const domain = new domain(req.body);
//         await domain.save();
//         res.status(201).json(domain);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getAll = async (req, res) => {
//     try {
//         const domains = await domain.find();
//         res.json(domains);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     };
// }

// exports.getId = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const domains = await domain.findById(id);
//         res.json(domains);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     };
// }

// exports.getDomain = async (req, res) => {
//     const domain = req.query.domain;
//     try {
//         const domains = await domain.find({ server_domain: domain });
//         res.json(domains);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     };
// }

// exports.deleteAll = async (req, res) => {
//     try {
//         await domain.deleteMany({});
//         res.status(200);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     };
// }

export default domainsController;