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

    describe('when updating todo', () => {
        let resultId;
        let change;
        let todos;
        let number;

        beforeAll(() => {
            todosListDAO = new DummyTodosListDAO();
            todoService = new TodoService();
        });

        beforeEach(() => {
            number = 1;
            todos = [
                {
                    "id": "1234567890n",
                    "title": "1",
                    "description": ""
                },
                {
                    "id": "1234567890",
                    "title": "1",
                    "description": ""
                }];

            change = {
                title: 'Test Change',
                description: 'Test Description Change'
            };

            sinon.stub(todosListDAO, 'getAllTodos').returns(Promise.resolve(todos));
            sinon.spy(todosListService, 'findTodoIndex');
            sinon.spy(todoService, 'updateTodo');
            sinon.spy(todosListDAO, 'saveAllTodos');
            return todosListService.updateTodoItem(todos[number].id, change).then((r) => {
                resultId = r;
            });
        });

        afterEach(() => {
            todosListService.findTodoIndex.restore();
            todoService.updateTodo.restore();
            todosListDAO.saveAllTodos.restore();
            todosListDAO.getAllTodos.restore();
        });

        it('+should return id of updated todo', () => {
            expect(resultId).toBe(todos[number].id);
        });

        it('+todosListDAO should load todos', () => {
            expect(todosListDAO.getAllTodos.calledOnce).toBe(true);
        });

        it('+findTodoIndex should called once', () => {
            expect(todosListService.findTodoIndex.calledOnce).toBeTruthy();
        });

        it('+updateTodo should be called for updating todo', () => {
            expect(todoService.updateTodo.calledOnce).toBe(true);
        });

        it('+todosListDAO should save updated todos', () => {
            expect(todosListDAO.saveAllTodos.calledOnce).toBeTruthy();
        });

        it('+findTodoIndex returns index of target todo', () => {
            expect(todosListService.findTodoIndex.getCall(0).args[0]).toBe(todos[number].id);
            expect(todosListService.findTodoIndex.returnValues[0]).toBe(number);
        });

        it('+updateTodo should be called with appropriate params', () => {
            expect(todoService.updateTodo.getCall(0).args[0]).toBe(change);
            expect(todoService.updateTodo.getCall(0).args[1]).toBe(todos[number]);
            expect(todoService.updateTodo.returnValues[0]).toEqual(expect.objectContaining(change));
        });

        it('+updateTodo should save appropriate params', () => {
            console.log(todosListDAO.saveAllTodos.getCall(0).args[0]);
            expect(todosListDAO.saveAllTodos.getCall(0).args[0][number]).toEqual(expect.objectContaining(change));
        });
    });

    describe('when removing todo', () => {
        let resultId;
        let removedTodo;
        let todos;

        beforeAll(() => {
            todosListDAO = new DummyTodosListDAO();
            todoService = new TodoService();
        });

        beforeEach(() => {
            todos = [
                {
                    "id": "1234567890n",
                    "title": "1",
                    "description": ""
                },
                {
                    "id": "1234567890",
                    "title": "1",
                    "description": ""
                }];

            removedTodo = {
                "id": "1234567890",
                "title": "1",
                "description": ""
            };

            sinon.stub(todosListDAO, 'getAllTodos').returns(Promise.resolve(todos));
            sinon.spy(todosListDAO, 'saveAllTodos');
            sinon.spy(todosListService, 'findTodoIndex');

            return todosListService.removeTodoItem(removedTodo.id).then((r) => {
                resultId = r;
            });
        });

        afterEach(() => {
            todosListDAO.saveAllTodos.restore();
            todosListDAO.getAllTodos.restore();
            todosListService.findTodoIndex.restore();
        });

        it('should return id of removed todo', () => {
            expect(resultId).toBe(removedTodo.id);
        });

        it('+todosListDAO should load todos', () => {
            expect(todosListDAO.getAllTodos.calledOnce).toBe(true);
        });

        it('+todosListDAO should save updated todos', () => {
            expect(todosListDAO.saveAllTodos.calledOnce).toBeTruthy();
        });

        it('+findTodoIndex returns index of target todo', () => {
            expect(todosListService.findTodoIndex.getCall(0).args[0]).toBe('1234567890');
            expect(todosListService.findTodoIndex.returnValues[0]).toBe(1);
        });

        it('+todosListDAO should save appropriate params', () => {
            console.log(todosListDAO.saveAllTodos.getCall(0).args[0]);
            expect(todosListDAO.saveAllTodos.getCall(0).args[0][0]).not.toEqual(expect.objectContaining(removedTodo));
        });
    });

    describe('when add Comment to TodoItem', () => {
        let todoItemId = 'todoId';
        let comment = 'Comment';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.addTodoItemComment(todoItemId, comment)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('should call updateTodoItem with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoItemId, {comment: comment})).toBe(true);
        });
    });

    describe('when like TodoItem', () => {
        let todoItemId = 'todoId';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.likeTodoItem(todoItemId)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('should call updateTodoItem with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoItemId, {isLiked: true})).toBe(true);
        });
    });

    describe('when unlike TodoItem', () => {
        let todoItemId = 'todoId';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.unlikeTodoItem(todoItemId)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('should call updateTodoItem with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoItemId, {isLiked: false})).toBe(true);
        });
    });

    describe('when complete TodoItem', () => {
        let todoItemId = 'todoId';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.completeTodoItem(todoItemId)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('should call updateTodoItem with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoItemId, {completed: true})).toBe(true);
        });
    });

    describe('when uncomplete TodoItem', () => {
        let todoItemId = 'todoId';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.uncompleteTodoItem(todoItemId)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('should call updateTodoItem with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoItemId, {completed: false})).toBe(true);
        });
    });
});

