//protótipo de midware

function autenticar(req, resposta, next){
    const authHeader = req.headers.authorization; //busca o token no cabeçalho 

    if(!authHeader){
        return resposta.status(401).json({erro: "Token não encontrado!"});
    }

    const token = authHeader.split(' ')[1]; //divide e pega só a segunda parte (o token de fato)

    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload; // guarda o usuário
        /* com isso, qualquer código pode agora usar:
        "req.usuario.id" ou
        "req.usuario.role" */
        next();
    } catch (err) { 
        return res.status(401).json({ erro: 'Token inválido' }); }

}