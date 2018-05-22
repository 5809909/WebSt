import express from 'express';
import { MongoClient } from 'mongodb';

import { TodoService, TodosListService } from '../../core/todos';
import { MONGO_URI } from '../constants';

import TodosListMongoDAO from './TodosListMongoDAO';
import TodoNotFoundError from './TodoNotFoundError';


export default function createRouter() {
  const router = express.Router({});

  let counter = 0;

  /**
   * @type {TodosListDAO}
   */
  const todosListDAO = new TodosListMongoDAO(MongoClient, MONGO_URI);
  const todoService = new TodoService();
  const todosListService = new TodosListService(todosListDAO, todoService);

  router.get('/', (req, res) => {
    todosListDAO
      .getAll()
      .then((todos) => {
        res.json(todos);
      });
  });

  router.post('/', (req, res) => {
    const { title, description } = req.body;
    todosListService
      .createTodoItem({
        title, description
      })
      .then((id) => {
        res.json( id );
      });
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;

    todosListService
      .removeTodoItem(id)
      .then(result => res.json({ deletedCount: result }));
  });

  router.patch('/:id', (req, res) => {
    const { id } = req.params;

    todosListService
      .updateTodoItem(id, req.body)
      .then(() => {
        res.json({ id });
      });
  });

  router.patch('/:id/completed', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
		console.log("completed:"+completed)   ;

    todosListService
      .toggleItemCompleted(id, completed)
      .then(() => {
        res.send(id);
      })
  });

  router.patch('/:id/like', (req, res) => {
    const { id } = req.params;
    const { isLiked } = req.body;

    todosListService
      .toggleItemLike(id, isLiked)
      .then(() => res.send(id));
  });

  router.patch('/:id/comment', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
		console.log("comment:"+comment)   ;

    todosListService
      .addItemComment(id, comment)
      .then(() => {
        res.send(id);
      });
  });

  router.use((err, req, res, next) => {
    if (err instanceof TodoNotFoundError) {
      res
        .status(404)
        .json({ message: err.message });
    } else {
      next(err);
    }
  });

  return router;
}
