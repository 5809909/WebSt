import { ACCOUNT_ID } from '../constants';
import { guid } from '../utils';

export default class TodoService {
	createTodo(data) {
		console.log("data3 "+data.title);

		data
		};

	updateTodo(change, todo) {
		return {
			...todo,
			...change,
			lastUpdateDate: new Date(),
			lastUpdateByUserId: ACCOUNT_ID,
			createdDate: todo.createdDate,
			createdByUserId: todo.createdByUserId,
		};
	}
};
