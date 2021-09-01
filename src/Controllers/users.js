const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");


module.exports = {
    async store(req, res) {
        const { name, email, password } = req.body;

        //vireificar se o usario já existe
        let user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user) {
            return res.status(400)
                .send({ error: "Esta e-mail já esta sendo utilizado" })
        }

        //gerar o hash da senha
        const passwordHashed = bcrypt.hashSync(password)

        //iserir o usuário no banco
        user = await User.create({
            name: name,
            email: email,
            password: passwordHashed
        })

        //gerar um token
        const token = jwt.sign(
            { userId: user.id },
            auth.secret, {
            expiresIn: "1h"
        })

        // retornar o usúario
        res.send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });

     
    }
}