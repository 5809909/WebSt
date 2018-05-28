import TodosListDAO from "./TodosListDAO";
import {URL} from "../constants";

export default class BackendTodosListDAO extends TodosListDAO {
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
                            this.saveAllTodos();
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
                    this.saveAllTodos();
				})
				.catch(function (err) {
					console.log('Fetch Error: ', err);
					reject(err);
				});

		});
	}

	removeById(id) {
        return new Promise((resolve, reject) => {
            const url = URL + id;
            fetch(url, {
                method: 'DELETE',
            })
                .then(this.status)
                .then(this.json)
                .then(data => {
                    resolve(data);
                    console.log(data);
                    this.saveAllTodos();
                })
                .catch(err => {
                    console.log('Fetch Error: ', err);
                    reject(err);
                });

        });
    };


	saveAllTodos() {
		try {

			this.getAll().then(todos=>
			this.notifyListeners(todos));

		} catch (e) {
			return Promise.reject(e);
		}
		return Promise.resolve();
	}
}
