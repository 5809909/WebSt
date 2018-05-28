

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
		return this.todosListDAO.create(data);
    }
	/**
	 * @param {string} todoId
	 * @param {Object} change
	 * @param {string} from
	 * @return {Promise<string>}
	 */
	updateTodoItem(todoId, change,from="update") {
		return this.todosListDAO.update(todoId, change,from)
			.then(() => todoId);
	}

	/**
	 * @param {string} todoId
	 * @param {string} commentText
	 */
	addTodoItemComment(todoId, commentText) {
		this.updateTodoItem(todoId, {comment: commentText},"comment");
	}

	/**
	 * @param {string} todoId
	 * @param {boolean} isliked
	 */
	likeTodoItem(todoId, isliked) {
		this.updateTodoItem(todoId, {isLiked: isliked},"isliked");
	}

	/**
	 * @param {string} todoId
	 * @param {boolean} completed
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
