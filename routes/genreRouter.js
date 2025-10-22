const { Router } = require('express');
const genreController = require('../controllers/genreController');

const genreRouter = Router();

// genreRouter.post('/create', genreController.createGenre);

genreRouter.get('/', genreController.index);
// genreRouter.get('/:id', genreController.showGenre);

genreRouter.post('/update', genreController.updateGenre);

genreRouter.get('/delete/:id', genreController.deleteGenre);

module.exports = genreRouter;
