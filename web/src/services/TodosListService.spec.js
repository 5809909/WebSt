import sinon from 'sinon';

import TodosListService from './TodosListService';
import DummyTodosListDAO from '../dao/DummyTodosListDAO';
import TodoService from './TodoService';

describe('TodosListService', () => {
    let todosListService;
    let todosListDAO;
    let todoService;

    beforeEach(() => {
        todosListService = new TodosListService(todosListDAO, todoService);
    });

    describe('when creating new todo', () => {
        let justCreatedTodo;
        let todoParams;
        let result;

        beforeAll(() => {
            todosListDAO = new DummyTodosListDAO();
            todoService = new TodoService();
        });

        beforeEach(() => {
            justCreatedTodo = {
                id: '1231233513251251235',
            };
            todoParams = {
                title: 'Test',
                description: 'Test description',
            };

            sinon.stub(todoService, 'createTodo').returns(justCreatedTodo);
            sinon.spy(todosListDAO, 'saveAllTodos');

            return todosListService.createTodoItem(todoParams).then((r) => {
                result = r;
            });
        });

        afterEach(() => {
            todoService.createTodo.restore();
            todosListDAO.saveAllTodos.restore();
        });

        it('should return id of created todo', () => {
            expect(result).toBe(justCreatedTodo.id);
        });

        it('todo service should be called for creating new todo', () => {
            expect(todoService.createTodo.calledOnce).toBe(true);
        });

        it('todo service should be called with appropriate params', () => {
            expect(todoService.createTodo.getCall(0).args[0]).toBe(todoParams);
        });

        it('todosListDAO should save all todos', () => {
            expect(todosListDAO.saveAllTodos.calledOnce).toBe(true);
        });
    });

    describe('when updating existing todo', () => {
        it('everything should be fine', () => {
            todosListService = new TodosListService();
        });
    });


    describe('when updating todo', () => {
        let todoId;
        let change;
        let result;
        let todos;


        beforeAll(() => {
            todosListDAO = new DummyTodosListDAO();
            todoService = new TodoService();
        });

        beforeEach(() => {
            todoId='1234567890'
            todos = [{
                "id": "1234567890",
                "completed": false,
                "isLiked": true,
                "createdDate": "2018-05-03T20:33:43.509Z",
                "comment": "1",
                "createdByUserId": 1,
                "lastUpdateDate": "2018-05-03T22:09:56.726Z",
                "lastUpdateByUserId": 1,
                "title": "1",
                "description": ""
            }];
            change = {
                title: 'Test Change',
                description: 'Test Description Change'
            };
            sinon.stub(todosListDAO, 'getAllTodos').returns(Promise.resolve(todos));
            sinon.stub(todoService, 'updateTodo').returns(todos);
            sinon.spy(todosListDAO, 'saveAllTodos');
            return todosListService.updateTodoItem(todoId, change).then((r) => {
                result = r;
            });
        });

        afterEach(() => {
            todoService.updateTodo.restore();
            todosListDAO.saveAllTodos.restore();
            todosListDAO.getAllTodos.restore();
            
        });

        it('should return id of updated todo', () => {
            expect(result).toBe(todoId);
        })

        it('todosListDAO should save updated todos', () => {
            expect(todosListDAO.saveAllTodos.calledOnce).toBe(true);
        });

        it('todo service should be called with appropriate params', () => {
            expect(todoService.updateTodo.getCall(0).args[0]).toBe(change);
            console.log(todoService.updateTodo.getCall(0).args);
            expect(todoService.updateTodo.getCall(0).args[1]).toBe(todos[0]);
        });


    })

});

