import sinon from 'sinon';

import TodosListService from './TodosListService';
import DummyTodosListDAO from './DummyTodosListDAO';
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
            sinon.spy(todosListDAO, 'create');

            return todosListService.createTodoItem(todoParams).then((r) => {
                result = r;
            });
        });


        afterEach(() => {
            todoService.createTodo.restore();
            todosListDAO.create.restore();
        });

        it('should return JSON with id of created todo', () => {
            expect(result).toBe(justCreatedTodo);
        });

        it('todo service should be called once for creating new todo', () => {
            expect(todoService.createTodo.calledOnce).toBe(true);
        });

        it('todo service should be called with appropriate params', () => {
            expect(todoService.createTodo.getCall(0).args[0]).toBe(todoParams);
        });

        it('todosListDAO should call create once', () => {
            expect(todosListDAO.create.calledOnce).toBe(true);
        });
    });

    describe('when updating todo', () => {
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

            sinon.stub(todosListDAO, 'getById').returns(todos[number]);
            sinon.spy(todoService, 'updateTodo');
            sinon.spy(todosListDAO, 'update');
            return todosListService.updateTodoItem(todos[number].id, change)
        });

        afterEach(() => {
            todosListDAO.getById.restore();
            todoService.updateTodo.restore();
            todosListDAO.update.restore();

        });

        it('getById should get todo and called once', () => {
            expect(todosListDAO.getById.calledOnce).toBe(true);
        });

        it('updateTodo should create updated todo and called once', () => {
            expect(todoService.updateTodo.calledOnce).toBeTruthy();
        });

        it('update should be called for saving todo in db', () => {
            expect(todosListDAO.update.calledOnce).toBe(true);
        });

        it('getById should be called with appropriate params', () => {
            expect(todosListDAO.getById.getCall(0).args[0]).toBe(todos[number].id);
        });

        it('getById returns target todo', () => {
            expect(todosListDAO.getById.returnValues[0]).toBe(todos[number]);
        });

        it('updateTodo should be called with appropriate param change', () => {
            expect(todoService.updateTodo.getCall(0).args[0]).toBe(change);
        });

        it('updateTodo should be called with appropriate param todo', () => {
            expect(todoService.updateTodo.getCall(0).args[1]).toBe(todos[number]);
        });

        it('updateTodo should return right updatedTodo ', () => {
            expect(todoService.updateTodo.returnValues[0]).toEqual(expect.objectContaining(change));
        });

        it('update should be called with appropriate params', () => {
            expect(todosListDAO.update.getCall(0).args[0]).toEqual(expect.objectContaining(change));
        });
    });

    describe('when updating todo with wrong ID', () => {
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

            sinon.stub(todosListDAO, 'getById').returns(null);
            sinon.spy(todoService, 'updateTodo');
            sinon.spy(todosListDAO, 'update');
            return todosListService.updateTodoItem(todos[number].id, change)
        });

        afterEach(() => {
            todosListDAO.getById.restore();
            todoService.updateTodo.restore();
            todosListDAO.update.restore();

        });

        it('getById should get todo and called once', () => {
            expect(todosListDAO.getById.calledOnce).toBe(true);
        });

        it('updateTodo should not called', () => {
            expect(todoService.updateTodo.calledOnce).toBe(false);
        });

        it('update should not called', () => {
            expect(todosListDAO.update.calledOnce).toBe(false);
        });

        it('getById should be called with appropriate params', () => {
            expect(todosListDAO.getById.getCall(0).args[0]).toBe(todos[number].id);
        });

        // it('update should be called with appropriate params', () => {
        //     expect(todosListService.updateTodoItem.valueOf).toBe(false);
        // });
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

            sinon.spy(todosListDAO, 'removeById');

            return todosListService.removeTodoItem(removedTodo.id).then((r) => {
                resultId = r;
            });
        });

        afterEach(() => {
            todosListDAO.removeById.restore();
        });

        it('removeById should be called once', () => {
            expect(todosListDAO.removeById.calledOnce).toBe(true);
        });

        it('removeById should be called with appropriate params', () => {
            expect(todosListDAO.removeById.getCall(0).args[0]).toBe('1234567890');
        });

        it('resultId should return 1 (number of removed todos)', () => {
            expect(resultId).toBe(1);
        });

    });

    describe('when add Comment to TodoItem', () => {
        let todoId = 'todoId';
        let commentText = 'Comment';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.addItemComment(todoId, commentText)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('updateTodoItem should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('should call updateTodoItem with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoId, {comment: commentText})).toBe(true);
        });
    });

    describe('when like TodoItem', () => {
        let todoId = 'todoId';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.toggleItemLike(todoId, true)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('updateTodoItem should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('updateTodoItem should be called with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoId, {isLiked: true})).toBe(true);
        });
    });


    describe('when complete TodoItem', () => {
        let todoId = 'todoId';

        beforeEach(() => {
            sinon.spy(todosListService, 'updateTodoItem');
            todosListService.toggleItemCompleted(todoId, false)
        });

        afterEach(() => {
            todosListService.updateTodoItem.restore();
        });

        it('updateTodoItem should be called once', () => {
            expect(todosListService.updateTodoItem.calledOnce).toBe(true);
        });

        it('updateTodoItem should be called with correct parameters', () => {
            expect(todosListService.updateTodoItem.calledWith(todoId, {completed: false})).toBe(true);
        });
    });

});

