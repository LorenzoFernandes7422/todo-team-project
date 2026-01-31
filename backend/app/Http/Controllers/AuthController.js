const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.js');

class AuthController {
    login(req, res){
        const usuario = /*validar no banco*/; //placeholder

        const token = jwt.sign(
            { id: usuario.id, role: usuario.role},
            process.env.JWT_SECRET,
            { expiresIn: jwt.Config.expiresIn}
        );

        return res.json({ token });
    }
}

module.exports = new AuthController(); //a ser usado nas rotas