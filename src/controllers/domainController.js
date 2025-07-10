const Domain = require('../models/Domain.js');

exports.creat = async (req, res) => {
    try {
        const domain = new Domain(req.body);
        await domain.save();
        res.status(201).json(domain);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

exports.getId = async (req, res) => {
    try {
        const id = req.params.id;
        const domains = await Domain.findById(id);
        res.json(domains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

exports.getDomain = async (req, res) => {
    const domain = req.query.domain;
    try {
        const domains = await Domain.find({ server_domain: domain });
        res.json(domains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}