const { Router } = require('express');
const gameController = require('../controllers/gameController');

const gameRouter = Router();

// gameRouter.post('/create', gameController.createGame);

gameRouter.get('/', gameController.index);

// gameRouter.post('/update/:id', gameController.updateGame);

gameRouter.get('/delete/:id', gameController.deleteGame);

module.exports = gameRouter;
