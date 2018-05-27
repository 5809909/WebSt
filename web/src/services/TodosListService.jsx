export default class TodosListService {

	constructor(todosListDAO, todoService) {
		this.todosListDAO = todosListDAO;
		this.todoService = todoService;
	}

	/**
	 * @param {Object} todos
	 * @param {string} todoId
	 * @return {Object} todo
	 */
	findTodoIndex(todoId, todos) {
		return todos.findIndex(todo => todo.id === todoId) ;
	}

	/**
	 * @param {Object} data
	 * @param {string} data.title
	 * @param {string} data.description
	 * @return {Promise<string>}
	 */
	createTodoItem(data) {
        const todo = this.todoService.createTodo(data);
        return this.todosListDAO.create(todo);
    }
	/**
	 * @param {string} todoId
	 * @param {Object} change
	 * @return {Promise<string>}
	 */
	updateTodoItem(todoId, change,from) {
		return this.todosListDAO.update(todoId, change,from)
			.then(() => todoId);
	}

	/**
	 * @param {string} todoId
	 * @param {string} commentText
	 */
	addTodoItemComment(todoId, commentText) {
		this.updateTodoItem(todoId, {comment: commentText});
        console.log(commentText);
	}

	/**
	 * @param {string} todoId
	 */
	likeTodoItem(todoId) {
		this.updateTodoItem(todoId, {isLiked: true});
        console.log("is liked");
	}

	/**
	 * @param {string} todoId
	 */
	unlikeTodoItem(todoId) {
		this.updateTodoItem(todoId, {isLiked: false});
        console.log("is unliked");
	}

	/**
	 * @param {string} todoId
*/
	completeTodoItem(todoId,completed) {
		this.updateTodoItem(todoId, {completed: completed},"completed");
	}

	/**
	 * @param {string} todoId
	 * @return {Promise<string>}
	 */
	removeTodoItem(todoId) {
		return this.todosListDAO.removeById(todoId)
			.then(() => todoId);
	}
}
