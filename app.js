const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const usersRoutes = require('./api/routes/users');
var path = require('path');

global.appRoot = path.resolve(__dirname);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Autorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods', 
			'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	};
	next();

})

app.use('/user', usersRoutes);
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;