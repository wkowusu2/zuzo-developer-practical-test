const { getDb } = require("../database/db");

let db = getDb();

function insertTask(task){
    try {
        if(!task.title) throw new Error('Task must have a title');

        db.set(task.id, task);
        return {success: true, task}
    } catch (error) {
        return {success: false, error: error?.message || error}
    }
}

function getAllTasks(){
    try {
        const tasks = db.values();
        let allTasks = [];
        for(const task of tasks){
            allTasks.push(task)
        }
        return {success: true, data: allTasks}
    } catch (error) {
        return {success: false, error: error?.message || error}
    }
}

function getTaskById(taskId){
    try {
        if(!taskId) throw new Error('Please provide a task id');
        const task = db.get(taskId);
        if(!task) throw new Error('Task does not exist');
        return {success: true, task}
    } catch (error) {
        return {success: false, error: error?.message || error}
    }
}

function updateTask(updatedTask){
    try {
        const {success, error, task} = getTaskById(updatedTask.id);
        if(!success) throw new Error(error?.message || error);

        const createRes = insertTask(updatedTask);
        if(!createRes.success) throw new Error(createRes.error?.message || createRes.error);
        return {success: true, task: createRes.task}
    } catch (error) {
        return {success: false, error: error?.message || error}
    }
}

module.exports = { insertTask, getTaskById, updateTask, getAllTasks }