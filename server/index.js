import express from 'express';
import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:32768/';
const app = express();


MongoClient.connect(url, function (err) {

    if (err) throw err;

    console.log('Successfully connected');

});

app.get('/', (req, res) => {
    res.send('Hello world!')
});

const server = app.listen(8080, () => {
    console.log("Server is up and running on port 8080");
});