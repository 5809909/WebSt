import TodoNotFoundError from "../../server/todos/TodoNotFoundError";

export default class TodosListService {
    /**
     * @type {TodosListDAO}
     */
    todosListDAO;

    /**
     * @type {TodoService}
     */
    todoService;

    /**
     * @param {TodosListDAO} todosListDAO
     * @param {TodoService} todoService
     */
    constructor(todosListDAO, todoService) {
        this.todosListDAO = todosListDAO;
        this.todoService = todoService;
    }

    /**
     * @param {TodoChange} todoChange
     * @return {Promise<TodoItem>}
     */
    createTodoItem(todoChange) {
        const todo = this.todoService.createTodo(todoChange);
        return this.todosListDAO.create(todo);
    }

    /**
     * @param {string} todoId
     * @param {TodoChange} change
     * @return {Promise<TodoItem>}
     */
    async updateTodoItem(todoId, change) {
        try {
            const todo = await this.todosListDAO.getById(todoId);
            console.log(todo);

            if (todo) {
                const updatedTodo = this.todoService.updateTodo(change, todo);
                return this.todosListDAO.update(updatedTodo);
            } else{
                console.log("todoId "+todoId);
                return TodoNotFoundError(todoId);
            }
        } catch (err){
            console.log("11111"+err);
        }
    }
    /**
     * @param {string} todoId
     * @returns {Promise<number>}
     */
    removeTodoItem(todoId) {
        return this.todosListDAO.removeById(todoId);
    }

    /**
     * @param {string} todoId
     * @param {string} commentText
     * @return {Promise<TodoItem>}
     */
    addItemComment(todoId, commentText) {
        return this.updateTodoItem(todoId, {comment: commentText});
    }

    /**
     * @param {string} todoId
     * @param {boolean} isLiked
     * @return {Promise<TodoItem>}
     */
    toggleItemLike(todoId, isLiked) {
        return this.updateTodoItem(todoId, {isLiked});
    }

    /**
     * @param {string} todoId
     * @param {boolean} completed
     * @return {Promise<TodoItem>}
     */
    toggleItemCompleted(todoId, completed) {
        return this.updateTodoItem(todoId, {completed});
    }
}
