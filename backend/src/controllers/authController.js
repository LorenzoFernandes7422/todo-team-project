const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwt');
const User = require('../models/User');

class AuthController{
async login(req, res){
 const { email, senha } = req.body;

 if(!email || !senha){
  return res.status(400).json({ erro: 'Email e senha são obrigatórios'});
 }

 const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(!emailValido.test(email)){
  return res.status(400).json({ erro: 'Email inválido'});
 }

 const usuario = await User.findOne({
  where: { 
    email,
    deleted_at: null
  }

 });

 if(!usuario){
  return res.status(404).json({ erro : 'Usuário não existe.'});
 }

 const senhaValida = await bcrypt.compare(senha, usuario.senha);
 if (!senhaValida){
  return res.status(401).json({ erro: 'Senha inválida'});
 }

 const token = jwt.sign(
  { id: usuario.id, email: usuario.email },
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn }
 );

 return res.json({token});

}

async me(req, res){
  const usuario = await User.findByPk(req.userId, {
    attributes: ['id', 'nome', 'email', 'created_at']
  });

  if (!usuario){
    return res.status(404).json({ erro: 'Usuario não existe'})
  }

  return res.json(usuario);
}

logout(req, res){
  return res.json({ message: 'Logout realizado com sucesso'});
}

}

module.exports = new AuthController();