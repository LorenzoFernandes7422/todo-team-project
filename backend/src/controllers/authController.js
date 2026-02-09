const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwt');
const prisma = require('../lib/prisma.js');

const authController = {
  async login(req, res) {
    const { email, senha } = req.body || {};

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
      return res.status(400).json({ erro: 'Email inválido' });
    }

    try {
      const usuario = await prisma.user.findFirst({
        where: {
          email,
          deletedAt: null
        }
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não existe.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha inválida' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
  },
   
  async me(req, res) {
    try {
      const usuario = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true
        }
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuario não existe' });
      }

      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
  },

  async logout(req, res) {
    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  }
};

module.exports = { authController };