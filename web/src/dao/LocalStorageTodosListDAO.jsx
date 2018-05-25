import cors from 'cors'

export default class LocalStorageTodosListDAO {
    listeners = null;

    getListeners() {
        if (!this.listeners) {
            this.listeners = [];
        }

        return this.listeners;
    }


    // const todos = JSON.parse(window.localStorage.getItem('todos'));
    // return Promise.resolve(todos || []);

    getAllTodos() {
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
                    console.log('Fetch Error :-S', err);
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
