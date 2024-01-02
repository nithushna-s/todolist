// todoRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo= require('../ models/todo')
router.get('/todos', async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    return success(res, todos);
  } catch (err) {
    console.error(err);
    next({ status: 400, message: 'Failed to get todos' });
  }
});

router.post('/todos', async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: 'Failed to create todo' });
  }
});

router.put('/todos/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: 'Failed to update todo' });
  }
});

router.delete('/todos/:id', async (req, res, next) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return next({ status: 404, message: 'Todo not found' });
    }
    return success(res, 'Todo deleted!');
  } catch (err) {
    console.error(err);
    next({ status: 400, message: 'Failed to delete todo' });
  }
});

function success(res, payload) {
  return res.status(200).json(payload);
}

module.exports = router;
