const { getTaskByUniqueId, createTask, getAllExistingTasks, updateExistingTask } = require('../controllers/tasks.controller');

const Router = require('express').Router;

const router = Router();

router.post('/', createTask); 
router.get('/', getAllExistingTasks);
router.get('/:id', getTaskByUniqueId);
router.patch('/:id', updateExistingTask);

module.exports = router