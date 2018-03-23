#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const fs = require('fs');
const path = require('path');

program
	.version('0.0.1')
	.description('TODO app');

const storagePath = path.resolve('./store.json');


function openFile() {
	return new Promise((resolve, reject) => {
		fs.open(storagePath, 'a+', (err, fd) => {

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
		fs.readFile(storagePath, 'utf8', (err, data) => {

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
		fs.writeFile(storagePath, data, (err) => {

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
		let newId;

		prompt(createQuestions)
			.then(receivedAnswers => {
				answers = receivedAnswers;
				return openFile().then()
			})
			.then(fd => {
				return readFile();
			})
			.then(data => {
				return JSON.parse(data);
			})
			.then(obj => {
				newId = guid();
				obj.todos.push({
					id: newId,
					title: answers.title,
					description: answers.description,
				});
				return obj;
			})
			.then(updatedObj => {
				return JSON.stringify(updatedObj);
			})
			.then(data => {
				writeFile(data);
				console.log(newId + " is saved");
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
		prompt(updateQuestions).then(answers => {
			openFile()
				.then(fd => {
					return readFile();
				})
				.then(data => {
					return JSON.parse(data);
				})
				.then(obj => {
					for (var key in obj.todos) {

						if (obj.todos[key].id == id) {
							for (var item in answers) {
								obj.todos[key][item] = answers[item];
							}
							console.log("Item with id:" + id + " was udated.");
							console.log(obj.todos[key]);

							return obj;
						}
					}

				})
				.then(updatedObj => {
					return JSON.stringify(updatedObj);
				})
				.then(data => {
					writeFile(data);

				})
				.catch(error => {
					console.error(`error: ${error}`);
				});

		});
	});


program
	.command('read <id>')
	.alias('rd')
	.description('Read TODO item')
	.action((id) => {

		openFile()
			.then(fd => {
				return readFile();
			})
			.then(data => {
				return JSON.parse(data);
			})
			.then(obj => {
				var key = -1;
				for (var i = 0; i < obj.todos.length; i++) {
					if (obj.todos[i].id == id) {
						key = i;
					}
				}
				if (key < 0) {
					console.log("no such item")
				}
				else {
					console.log(obj.todos[key]);
				}
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
		openFile()
			.then(fd => {
				return readFile();
			})
			.then(data => {
				return JSON.parse(data);
			})
			.then(obj => {
				for (var key in obj.todos) {

					if (obj.todos[key].id == id) {
						obj.todos.splice(key, 1);
						console.log("Item with id:" + id + " was deleted. ostalos - " + obj.todos.length);
						return obj;
					}
				}

			})
			.then(updatedObj => {
				return JSON.stringify(updatedObj);
			})
			.then(data => {
				writeFile(data);

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

		openFile()
			.then(fd => {
				return readFile();
			})
			.then(data => {
				return JSON.parse(data);
			})
			.then(obj => {
				for (var key in obj.todos) {
					console.log(obj.todos[key].id)
				}

				console.log(obj.todos.length);
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
		openFile()
			.then(fd => {
				return readFile();
			})
			.then(data => {
				return JSON.parse(data);
			})
			.then(obj => {
				for (var key in obj.todos) {

					if (obj.todos[key].id == id) {
						obj.todos[key].push({
							liked: true
						});

						console.log("Item with id:" + id + " was liked.");
						console.log(obj.todos[key]);

						return obj;
					}
				}

			})
			.then(updatedObj => {
				return JSON.stringify(updatedObj);
			})
			.then(data => {
				writeFile(data);

			})
			.catch(error => {
				console.error(`error: ${error}`);
			});


	});

program
	.command('comment <id>')
	.alias('cmt')
	.description('Comment TODO item')
	.action((id) => {
		prompt(commentQuestions).then(answers => {
			// TODO comment for todo item
		});
	});

program.parse(process.argv);
