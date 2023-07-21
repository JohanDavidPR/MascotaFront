const {
    Router
} = require('express');
const userRouter = Router();

const {
    getUsers,
    getUser,
    getUserDocument,
    addUser,
    validateUser
} = require('../Controllers/UserController');

userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.get('/user/document/:id', getUserDocument);
userRouter.post('/user', addUser);
userRouter.post('/user/login', validateUser);

module.exports = userRouter;