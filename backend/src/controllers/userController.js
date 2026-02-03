const prisma = require('../lib/prisma.js');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userController = {
  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos sao obrigatorios' });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Email invalido' });
      }

      if (senha.length < 6) {
        return res.status(400).json({ error: 'Senha deve ter no minimo 6 caracteres' });
      }

      const existingUser = await prisma.user.findFirst({
        where: { email, deletedAt: null }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email ja esta em uso' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const user = await prisma.user.create({
        data: {
          nome,
          email,
          senha: senhaHash
        }
      });

      const { senha: _, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuario' });
    }
  },

  async list(req, res) {
    try {
      const users = await prisma.user.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar usuarios' });
    }
  },

  async show(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalido' });
      }

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user || user.deletedAt) {
        return res.status(404).json({ error: 'Usuario nao encontrado' });
      }

      const { senha, ...userWithoutPassword } = user;

      return res.json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
  },

  async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { nome, email, senha } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalido' });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser || existingUser.deletedAt) {
        return res.status(404).json({ error: 'Usuario nao encontrado' });
      }

      if (email && email !== existingUser.email) {
        if (!validator.isEmail(email)) {
          return res.status(400).json({ error: 'Email invalido' });
        }

        const emailExists = await prisma.user.findFirst({
          where: {
            email,
            deletedAt: null,
            NOT: { id }
          }
        });

        if (emailExists) {
          return res.status(400).json({ error: 'Email ja esta em uso' });
        }
      }

      const updateData = {};

      if (nome) updateData.nome = nome;
      if (email) updateData.email = email;

      if (senha) {
        if (senha.length < 6) {
          return res.status(400).json({ error: 'Senha deve ter no minimo 6 caracteres' });
        }
        updateData.senha = await bcrypt.hash(senha, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
  },

  async delete(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalido' });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser || existingUser.deletedAt) {
        return res.status(404).json({ error: 'Usuario nao encontrado' });
      }

      await prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() }
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
  }
};

module.exports = { userController };
