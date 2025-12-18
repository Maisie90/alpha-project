const { Router } = require('express');

const userController = require('../controllers/user.js');
const authenticator = require('../middleware/authenticator');

const userRouter = Router();

userRouter.get("/", userController.index);

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get('/me', authenticator, userController.me);

module.exports = userRouter;