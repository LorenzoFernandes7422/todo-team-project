const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const login = (req, res) => {
  const usuario = {}; // TODO: validar no banco (email/senha) e obter usuário

  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return res.json({ token });
};

module.exports = { login };
