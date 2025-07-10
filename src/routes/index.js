const express = require('express');
const domains = require('./domainRoutes.js')

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Server Clean Project!"));

    app.use(express.json(), domains);
};

module.exports = routes;