export default class LocalStorageTodosListDAO {
	/**
	 * @return {TodoObject[]}
	 */
	static getAllTodos() {
		if (typeof window.localStorage.todos === 'undefined') {
			window.localStorage.todos = '[]';
		}
	//	console.log(JSON.parse(window.localStorage.getItem('todos')))
		return Promise.resolve(JSON.parse(window.localStorage.getItem('todos')));
	}

	/**
	 * @param {TodoObject[]} todos
	 */
	static saveAllTodos(todos) {
		window.localStorage.setItem('todos', JSON.stringify(todos));
		//console.log("todos ",todos);
		return Promise.resolve();
	}
}
