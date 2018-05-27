import cors from 'cors'
import TodosListDAO from "./TodosListDAO";

export default class LocalStorageTodosListDAO extends TodosListDAO  {
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
            fetch("http://localhost:8081/todos", {mode: cors})
                .then(response => {

                    if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                            return;
                        }

                        response.json()
                            .then(data => {
                                resolve(data);
                                console.log(data);
                            })
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error: ', err);
                    reject(err);
                });

        });
    }

    create(data) {

        return new Promise ("dfgdfgd");
    }

    update(id, change,from) {
        const url= "http://localhost:8081/todos"+id+"/"+from;
        console.log(url) ;
        console.log(from) ;
        return new Promise((resolve, reject) => {
            fetch("http://localhost:8081/todos", {mode: cors})
                .then(response => {

                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                            return;
                        }

                        response.json()
                            .then(data => {
                                resolve(data);
                                console.log(data);
                            })
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error: ', err);
                    reject(err);
                });

        });

        return 1;
    }

    removeById(id) {

        return 1;
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
