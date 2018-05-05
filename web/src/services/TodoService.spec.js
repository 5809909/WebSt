import TodoService from './TodoService';
import { guid } from '../utils';
import { ACCOUNT_ID } from '../constants';


describe('TodoService', () => {
  let todoService;

  beforeAll(() => {
    todoService = new TodoService();
  });

  describe('when creating new todo', () => {
    let justCreatedTodo;
    let todoParams;

    beforeAll(() => {
      todoParams = {
        title: 'Test',
        description: 'Test description',
      };

      justCreatedTodo = todoService.createTodo(todoParams);
    });

    it('"id" should be generated automatically', () => {
      expect(justCreatedTodo.id).toEqual(expect.any(String));
      expect(justCreatedTodo.id).toHaveLength(36);
    });

    it('"createdDate" and "createdByUserId" should be generated automatically', () => {
      expect(justCreatedTodo.createdDate).toEqual(expect.any(Date));
      expect(justCreatedTodo.createdByUserId).toEqual(expect.any(Number));
    });

    it('"lastUpdateDate" should be equals to "createdDate"', () => {
      expect(justCreatedTodo.lastUpdateDate).toBe(justCreatedTodo.createdDate);
    });

    it('"lastUpdateByUserId" should be equals to "createdByUserId"', () => {
      expect(justCreatedTodo.lastUpdateByUserId).toBe(justCreatedTodo.createdByUserId);
    });

    it('passed params should be applied correctly', () => {
      expect(justCreatedTodo).toEqual(expect.objectContaining({
        title: todoParams.title,
        description: todoParams.description,
      }));
    });
  });

  describe('when updating existing todo', () => {
    const now = new Date();

    let change;
    let targetTodo;
    let updatedTodo;

    beforeAll(() => {
      change = {
        title: 'New title',
        description: 'New description',
      };

      targetTodo = {
        id: guid(),
        title: 'Test title',
        description: 'Test description',
        comment: null,
        createdDate: now,
        createdByUserId: ACCOUNT_ID,
        isLiked: false,
          completed: false,
        lastUpdateDate: now,
        lastUpdateByUserId: ACCOUNT_ID,
      };

      updatedTodo = todoService.updateTodo(change, targetTodo);
    });

    it('new params should be applied correctly', () => {
      expect(updatedTodo).toEqual(expect.objectContaining({
        title: change.title,
        description: change.description,
      }));
    });

    it('"lastUpdateDate" should be updated automatically', () => {
      expect(updatedTodo.lastUpdateDate).not.toBe(targetTodo.lastUpdateDate);
    });

      it('"all other properties should be the same', () => {
          expect(updatedTodo.id).toBe(targetTodo.id);
          expect(updatedTodo.comment).toBe(targetTodo.comment);
          expect(updatedTodo.createdByUserId).toBe(targetTodo.createdByUserId);
          expect(updatedTodo.isLiked).toBe(targetTodo.isLiked);
          expect(updatedTodo.completed).toBe(targetTodo.completed);
      });
  });
});
