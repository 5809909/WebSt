#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const fs = require('fs');
const path = require('path');

program
	.version('0.0.1')
	.description('TODO app');

const STORAGE_PATH = path.resolve('./store.json');
const TEXT_NOT_FOUND = "TODO item not found";

function openFile() {
	return new Promise((resolve, reject) => {
		fs.open(STORAGE_PATH, 'a+', (err, fd) => {

			if (err) {
				console.log("error");
				reject(err);
				return;
			}

			resolve(fd);
		});
	});
}


function readFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(STORAGE_PATH, 'utf8', (err, data) => {

			if (err) {
				reject(err);
				return;
			}

			resolve(data);
		});
	});
}

function writeFile(data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(STORAGE_PATH, data, (err) => {

			if (err) {
				reject(err);
				return;
			}

			resolve();
		});
	});
}

function guid() {

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getDataFromFile() {
	return openFile()
		.then(() => {
			return readFile();
		})
		.then(data => {
			let jsonData = data;
			if (!jsonData) {
				jsonData = "{}";
			}
			return JSON.parse(jsonData);
		})
		.then(obj => {
			return obj.todos || [];
		})
}


function createTodo(data) {
	return {
		id: guid(),
		title: data.title,
		description: data.description,
		isLiked: false,
		comment: null
	}
}

function saveDataToFile(todos) {
	return writeFile(JSON.stringify({todos}));
}

function updateData(id, newData) {
	return getDataFromFile()
		.then(todos => {
			const index = findIndex(id, todos);
			if (index >= 0) {
				const aim = todos[index];
				const result = [...todos];
				result.splice(index, 1, {...aim, ...newData});
				return saveDataToFile(result);
			} else {
				console.log(TEXT_NOT_FOUND);
			}
		})
}

function findIndex(id, todos) {
	return todos.findIndex(todo => todo.id === id)
}

// Craft questions to present to users
const createQuestions = [
	{
		type: 'input',
		name: 'title',
		message: 'Enter title ...'
	},
	{
		type: 'input',
		name: 'description',
		message: 'Enter description ...'
	},
];

const updateQuestions = [
	{
		type: 'input',
		name: 'title',
		message: 'Enter new title ...'
	},
	{
		type: 'input',
		name: 'description',
		message: 'Enter new description ...'
	},
];

const commentQuestions = [
	{
		type: 'input',
		name: 'comment',
		message: 'Enter comment ...'
	},
];

program
	.command('create')
	.alias('cr')
	.description('Create new TODO item')
	.action(() => {
		let answers;

		prompt(createQuestions)
			.then(receivedAnswers => {
				answers = receivedAnswers;
				return getDataFromFile();
			})
			.then(todos => {
				const todoItem = createTodo(answers);
				const result = [...todos, todoItem];
				return saveDataToFile(result)
					.then(() => console.log(todoItem.id + " is saved"));
			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	});

program
	.command('update <id>')
	.alias('upd')
	.description('Update TODO item')
	.action((id) => {
		prompt(updateQuestions)
			.then(answers => {
				return updateData(id, answers)
					.then(() => console.log(id));
			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	});

program
	.command('like <id>')
	.alias('lk')
	.description('Like TODO item')
	.action((id) => {
		return updateData(id, {isLiked: true})
			.then(() => {
				console.log(id + " is liked")
			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	})


program
	.command('unlike <id>')
	.alias('unlk')
	.description('Unlike TODO item')
	.action((id) => {
		return updateData(id, {isLiked: false})
			.then(() => {
				console.log(id + " is unliked")
			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	})


program
	.command('comment <id>')
	.alias('cmt')
	.description('Comment TODO item')
	.action((id) => {
		prompt(commentQuestions)
			.then(({comment}) => updateData(id, {comment}))
			.then(() => {
				console.log(id + " is commented")
			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	})

program
	.command('read <id>')
	.alias('rd')
	.description('Read TODO item')
	.action((id) => {
		getDataFromFile()
			.then(todos => {
				let index = findIndex(id, todos)
				if (index  >= 0) {
					console.log(todos[index]);
				} else console.log(TEXT_NOT_FOUND);

			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	});

program
	.command('remove <id>')
	.alias('rm')
	.description('Remove TODO item by id')
	.action((id) => {
		return getDataFromFile()
			.then(todos => {
				let index = findIndex(id, todos)
				if (index  >= 0) {
					const result = [...todos];
					const removed = result.splice(index, 1)
					return saveDataToFile(result)
						.then(() => console.log(removed.length + " item(s) was removed"));
				} else console.log(TEXT_NOT_FOUND);

			})
			.catch(error => {
				console.error(`error: ${error}`);
			});
	});

program
	.command('list')
	.alias('ls')
	.description('List all TODOs')
	.action(() => {
		getDataFromFile()
			.then(list => console.log(list))
			.catch(error => {
				console.error(`error: ${error}`);
			});
	});


program.parse(process.argv);
