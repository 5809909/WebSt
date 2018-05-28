import cors from 'cors'
import TodosListDAO from "./TodosListDAO";
import {URL} from "../constants";

export default class LocalStorageTodosListDAO extends TodosListDAO {
	listeners = null;


	getListeners() {
		if (!this.listeners) {
			this.listeners = [];
		}

		return this.listeners;
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


	getAll() {
		return new Promise((resolve, reject) => {

			fetch(URL, {
				method: 'GET',
			})
				.then(this.status)
				.then(this.json)
				.then(data => {
					resolve(data);
					console.log("getAll"+JSON.stringify(data));
				})
				.catch(err => {
					console.log('Fetch Error: ', err);
					reject(err);
				});

		});
	}

	status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(new Error(response.statusText))
		}
	}

	json(response) {
		return response.json()
	}

	create(data) {
		console.log("OUT:"+JSON.stringify(data));
		return new Promise((resolve, reject) => {
			fetch(URL, {
				method: 'POST',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				body: JSON.stringify(data),
			})
				.then(this.status)
				.then(this.json)

						.then(data => {
							resolve(data);
							console.log("resolve data "+JSON.stringify(data));
				//			this.notifyListeners(JSON.stringify(data));
						})
						.catch(function (err) {
							console.log('Fetch Error: ', err);
							reject(err);
						});
		});
	}

	update(id, change, from) {
		const url = URL + id + "/" + from;
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'PATCH',
				mode: cors,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				body: JSON.stringify(change),
			})
				.then(this.status)
				.then(this.json)
				.then(data => {

					resolve(data);
					console.log(data);
				})
				.catch(function (err) {
					console.log('Fetch Error: ', err);
					reject(err);
				});

		});
	}

	removeById(id) {
		return new Promise((resolve, reject) => {
			const url = URL + id ;
			fetch(url, {
				method: 'DELETE',
			})
				.then(this.status)
				.then(this.json)
				.then(data => {
					resolve(data);
					console.log(data);
				})
				.catch(err => {
					console.log('Fetch Error: ', err);
					reject(err);
				});

		});
	}

	/**
	 * @param {TodoObject[]} todos
	 */
	saveAllTodos(todos) {
		try {
			window.localStorage.setItem('todos', JSON.stringify(todos));
			this.notifyListeners(todos);
		} catch (e) {
			return Promise.reject(e);
		}
		return Promise.resolve();
	}
}
