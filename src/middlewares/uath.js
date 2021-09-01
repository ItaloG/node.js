const jwt = require("jsonwebtoken");
const auth = require("../config/auth");


module.exports = (req, res, next) => {
    // pergar o token no cabeçalho
    const authorization = req.headers.authorization;

    //verificar se o token veio
    if (!authorization) {
        return res.status(401).send({ error: "token não informado" });
    }

    //separa o prefixo dp token
    const [prefixo, token] = authorization.split(" ");

    //verificar se o token é valido
    
    try {
        //se o token é valido, recebemos o payload
        
        const payload = jwt.verify(token, auth.secret);
        
        //colocamos o id do usuário na requisição
        //para que o controller possa recuperar
        req.userId = payload.userId;
        
        
        return next();
        
    } catch (error) {
        // retornamos token ivalido
        
        
        res.status(401).send({ error: "token ivalido" });
    }



}