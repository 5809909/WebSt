import cors from 'cors';

export default class LocalStorageTodosListDAO {
	listeners = null;

	getListeners() {
		if (!this.listeners) {
			this.listeners = [];
		}

		return this.listeners;
	}


	getAllTodos() {
		return new Promise((rej, res) => {
			const todos = fetch("http://localhost:8081/todos", {mode: cors})
				.then(res => JSON.parse(res.json()))
				.then()
		});
	}


	/**
	 * @param {TodoObject[]} todos
	 */
	saveAllTodos(todos) {
		try {
			window.localStorage.setItem('todos', JSON.stringify(todos));
			this.notifyListeners(todos);
		} catch(e) {
			return Promise.reject(e);
		}

		return Promise.resolve();
	}

	notifyListeners(todos) {
		this
			.getListeners()
			.forEach((listener) => {
				listener(todos);
			});
	}

	subscribe(listener) {
		const listeners = this.getListeners();

		listeners.push(listener);

		return () => {
			listeners.filter((l) => listener !== l);
		};
	}
}
