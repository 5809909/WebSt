export default class LocalStorageTodosListDAO {
    /**
     * @return {TodoObject[]}
     */
    getAllTodos() {
        if (typeof window.localStorage.todos === 'undefined') {
            window.localStorage.todos = '[]';
            console.log("1111");
        }

        return Promise.resolve(JSON.parse(window.localStorage.getItem('todos')));
    }

    /**
     * @param {TodoObject[]} todos
     */
    saveAllTodos(todos) {
        window.localStorage.setItem('todos', JSON.stringify(todos));
        return Promise.resolve();
    }
}
