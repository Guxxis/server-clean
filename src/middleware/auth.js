
async function auth (req, res, next){
    const token = req.headers['authorization'];

    if (!token || token !== process.env.API_TOKEN) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    next();
}

export default auth;
