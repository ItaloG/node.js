const routes = require("express").Router();

const uploadSigleImage = require("./middlewares/uploadSingleImage");

const postController = require("./controllers/posts");
const sessionController = require("./controllers/sessions");
const userController = require("./controllers/users");
const authMiddleware = require("./middlewares/auth");

//rotas públicas
routes.post('/sessions', sessionController.store);
routes.post('/users', userController.store);

routes.use(authMiddleware);

//rotas privadas
routes.get('/posts', postController.index);
routes.post("/posts", uploadSigleImage,  postController.store);

module.exports = routes;