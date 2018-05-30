import express from 'express';
import { MongoClient } from 'mongodb';
 import  joi  from 'joi';

import { TodoService, TodosListService } from '../../core/todos';
import { MONGO_URI } from '../constants';
import expressJoiMiddleware from 'express-joi-middleware';
import TodosListMongoDAO from './TodosListMongoDAO';
import TodoNotFoundError from './TodoNotFoundError';


export default function createRouter() {
  const router = express.Router({});

  /**
   * @type {TodosListDAO}
   */
  const todosListDAO = new TodosListMongoDAO(MongoClient, MONGO_URI);
  const todoService = new TodoService();
  const todosListService = new TodosListService(todosListDAO, todoService);
  const bodySchema= {
		body: {
			title: joi.string().max(10).required(),
      description:joi.string(),
		},
	};
	const options = {
		wantResponse: true,
	};

  router.get('/', (req, res) => {
    todosListDAO
      .getAll()
      .then((todos) => {
        res.json(todos);
      });
  });

  router.post('/',expressJoiMiddleware(bodySchema, options), (req, res) => {

    const { title, description } = req.body;
    console.log("IN "+JSON.stringify(req.body));
    todosListService
      .createTodoItem({
        title, description
      })
      .then((id) => {
        res.send( {id} );
      });
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;

    todosListService
      .removeTodoItem(id)
      .then(result => res.json({ deletedCount: result }));
  });

  router.patch('/:id/update',expressJoiMiddleware(bodySchema, options), (req, res) => {
    const { id } = req.params;

    todosListService
      .updateTodoItem(id, req.body)
      .then((id) => {
        res.send( {id });
      });
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;

		todosListDAO
      .getById(id)
      .then((todo => {
        res.send( todo );
      }));
  });

  router.patch('/:id/completed', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    todosListService
      .toggleItemCompleted(id, completed)
      .then((id) => {
        res.send({id});
      })
  });

  router.patch('/:id/isliked', (req, res) => {
    const { id } = req.params;
    const { isLiked } = req.body;

    todosListService
      .toggleItemLike(id, isLiked)
      .then((id) => res.send({id}));
  });

  router.patch('/:id/comment', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    todosListService
      .addItemComment(id, comment)
      .then((id) => {
        res.send({id});
      });
  });

	router.all('/*', function(req, res){
		res.status(404);
		res.render('404', {
			title: 'Express'
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
