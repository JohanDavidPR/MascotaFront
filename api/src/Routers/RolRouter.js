const {
    Router
} = require('express');
const rolRouter = Router();

const {
    getRoles
} = require('../Controllers/RolController');

rolRouter.get('/roles', getRoles);

module.exports = rolRouter;