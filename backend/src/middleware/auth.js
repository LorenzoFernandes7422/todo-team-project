const jwt = require('jsonwebtoken');
const jwtConfig = require('../../../config/jwt');

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const payload = jwt.verify(token, jwtConfig.secret);

        // dados disponíveis nas rotas
        req.userId = payload.id;

        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}

module.exports = autenticar;