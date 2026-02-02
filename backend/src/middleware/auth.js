const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não encontrado!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

module.exports = auth;
