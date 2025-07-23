import express from 'express';
import domains from './domainRoutes.js';

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Server Clean Project!"));
    app.use(express.json(), domains);
};

export default routes;