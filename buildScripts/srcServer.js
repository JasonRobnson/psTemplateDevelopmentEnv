import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
let app = express();
const compiler = webpack(config);

app.use(
	require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
	})
);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});
app.get('/users', (req, res) => {
	//hard coded for simplicity. Pretend this hits a real database
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email":"bob@gmail.com"},
		{"id": 2, "firstName": "Bob1", "lastName": "Smith1", "email":"1bob@gmail.com"},
		{"id": 3, "firstName": "Bob2", "lastName": "Smith2", "email":"2bob@gmail.com"},
		{"id": 4, "firstName": "Bob3", "lastName": "Smith3", "email":"3bob@gmail.com"},
		{"id": 5, "firstName": "Bob4", "lastName": "Smith4", "email":"4bob@gmail.com"},
	])
});
app.listen(port, err => {
	if (err) {
		console.log(err);
	} else {
		open('http://localhost:' + port);
	}
});
