const { Response, Router } = require('express');
const { validateError } = require('../../utils/functions');
const taskGateway = require('./task.gateway');
const { auth } = require('../../config/jwt');

const getAll = async (req, res = Response) => {
    try {
        const tasks = await taskGateway.getAllByUserId(req.userId);
        res.status(200).json(tasks);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const createTask = async (req, res = Response) => {
    try {
        const { title, description } = req.body;
        const user_id = req.userId ;
        const task = await taskGateway.create({title, description, user_id});
        res.status(201).json(task);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const editTask = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const updated = await taskGateway.update(id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const deleteTask = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const result = await taskGateway.remove(id);
        res.status(200).json(result);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const taskRouter = Router();


taskRouter.get('/', [auth], getAll);
taskRouter.post('/', [auth], createTask);
taskRouter.put('/:id', [auth], editTask);
taskRouter.delete('/:id', [auth], deleteTask);

module.exports = {
    taskRouter,
};
