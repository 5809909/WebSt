import { ACCOUNT_ID } from '../constants';
import { guid } from '../utils';

export default class TodoService {
	createTodo(data) {
		const now = new Date();
		return {
            id: guid(),
            completed:false,
            isLiked: false,
            createdDate: now,
            comment: null,
            createdByUserId: ACCOUNT_ID,
			lastUpdateDate: now,
			lastUpdateByUserId: ACCOUNT_ID,
			...data,
		};
	}

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
