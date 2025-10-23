const { Router } = require('express');
const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get('/create', gameController.createGameGet);
// gameRouter.post('/create', gameController.createGamePost);

gameRouter.get('/', gameController.index);

gameRouter.post('/update', gameController.updateGame);

gameRouter.get('/delete/:id', gameController.deleteGame);

module.exports = gameRouter;
