import express from 'express';
import cors from 'cors';
import validator from 'express-validator';

import { createRouter } from './server/todos';

const app = express();

app.listen(8081, () => {
	app.use(express.urlencoded({extended: true}));
    app.use(validator());
	app.use(express.json());
	app.use(cors());
	app.use('/todos', createRouter());

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ message:  `Something went wrong` });
    });

    console.info('Server listening on port 8081');
});
