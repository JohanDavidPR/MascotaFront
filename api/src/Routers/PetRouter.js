const {
    Router
} = require('express');
const petRouter = Router();

const {
    getPets,
    getPet,
    addPet
} = require('../Controllers/PetController');

const {
    checkAuth
} = require('../Middleware/auth');

const {
    checkRoleAuth
} = require('../Middleware/roleAuth');

petRouter.get('/pets', getPets);
petRouter.get('/pet/:id', checkAuth, getPet);
petRouter.post('/pet', checkAuth, checkRoleAuth('fundacion'), addPet);

module.exports = petRouter;