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
		let todoId;

		return this.todosListDAO.getAllTodos()
			.then((todos) => {
				const todo = this.todoService.createTodo(data);
				todoId = todo.id;
				const result = [...todos, todo];
				return this.todosListDAO.saveAllTodos(result);
			})
			.then(() => todoId);
	}

	/**
	 * @param {string} todoId
	 * @param {TodoChange} change
	 * @return {Promise<string>}
	 */
	updateTodoItem(todoId, change) {
		return this.todosListDAO.getAllTodos()
			.then((todos) => {
				const index = this.findTodoIndex(todoId, todos);
				const target = todos[index];
				const result = [...todos];
				result.splice(index, 1, this.todoService.updateTodo(change, target));
				return this.todosListDAO.saveAllTodos(result);
			})
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
	completeTodoItem(todoId) {
		this.updateTodoItem(todoId, {completed: true});
	}

	/**
	 * @param {string} todoId
	 */
	uncompleteTodoItem(todoId) {
		this.updateTodoItem(todoId, {completed: false});
	}

	/**
	 * @param {string} todoId
	 * @return {Promise<string>}
	 */
	removeTodoItem(todoId) {
		return this.todosListDAO.getAllTodos()
			.then((todos) => {
				const index = this.findTodoIndex(todoId, todos);
				const result = [...todos];
				const removed = result.splice(index, 1) ;
				return this.todosListDAO.saveAllTodos(result);
			})
			.then(() => todoId);
	}
}
