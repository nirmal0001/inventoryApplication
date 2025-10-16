const { Router } = require('express');
const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.post('/create', gameController.createGame);

gameRouter.get('/', gameController.index);
gameRouter.get('/:id', gameController.showGame);

gameRouter.post('/update/:id', gameController.updateGame);

gameRouter.delete('/delete/:id', gameController.deleteGame);

module.exports = gameRouter;
