const { insertTask, getTaskById, getAllTasks } = require("../repository/tasks.repository");
const crypto = require('crypto');

function createTask(req, res){
    try {
        let incomingTask = req.body;
        
        const allowedStatus = ['pending', 'completed'];

        if(!incomingTask.title) throw new Error('Task should have a title');
        if(typeof incomingTask.title !== 'string') throw new Error('The title must be a string');
        if(!allowedStatus.includes(incomingTask.status.toLowerCase())) throw new Error('Invalid task status');

        incomingTask['id'] = crypto.randomUUID();
        incomingTask['title'] = incomingTask.title.trim();
        incomingTask['status'] = incomingTask.status.toLowerCase();

        const taskRes = insertTask(incomingTask);
        if(!taskRes.success) throw new Error(taskRes.error);

        return res.status(201).json({success: true, data: taskRes.task})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

function getTaskByUniqueId(req, res){
    try {
        const taskId = req.params.id;
        if(!taskId) throw new Error('Please provide task id');
        const task = getTaskById(taskId);
        if(!task.success) throw new Error(task.error);
        return res.status(201).json({success: true, data: task.task})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

function updateExistingTask(req, res){
        try {
        let incomingTask = req.body;
        const taskId = req.params.id;
        const allowedStatus = ['pending', 'completed'];

        if(!incomingTask.title) throw new Error('Task should have a title');
        if(typeof incomingTask.title !== 'string') throw new Error('The title must be a string');
        if(!allowedStatus.includes(incomingTask.status.toLowerCase())) throw new Error('Invalid task status');

        const task = getTaskById(taskId);
        if(!task) throw new Error('Task does not exist');

        incomingTask['id'] = taskId;
        incomingTask['title'] = incomingTask.title.trim();
        incomingTask['status'] = incomingTask.status.toLowerCase();

        const taskRes = insertTask(incomingTask);
        if(!taskRes.success) throw new Error(taskRes.error);

        return res.status(200).json({success: true, data: taskRes.task})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

function getAllExistingTasks(req, res){
    try {
       const tasks = getAllTasks();
       if(!tasks.success) throw new Error(tasks.error);

       return res.status(200).json({success: true, data: tasks.data})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

module.exports = {createTask, getTaskByUniqueId, updateExistingTask, getAllExistingTasks}