const { Router } = require('express');
const developerController = require('../controllers/developerController');

const developerRouter = Router();

// developerRouter.post('/create', developerController.createDeveloper);

developerRouter.get('/', developerController.index);
// developerRouter.get('/:id', developerController.showDeveloper);

// developerRouter.post('/update/:id', developerController.updateDeveloper);

developerRouter.get('/delete/:id', developerController.deleteDeveloper);

module.exports = developerRouter;
