const express = require('express')
// const session = require('express-session')
const app     = express()
const bodyParser = require('body-parser')
const timings = require('server-timings')
const morgan = require('morgan')
// const passport = require('passport')

const routes  = require('./routes');
require('./scripts/db');

function errorHandler (err, req, res, next) {
	res.status(500)
	res.render('error', { error: err })
}

app.use(bodyParser.raw({limit: '25mb'}) );
app.use(express.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: "25mb",extended: false}));

// app.use(session({ secret: "cats" }));

app.use(morgan('dev'));
app.use(timings);

app.get('/api/ping', (req, res) => {
	res.send("OK");
})

/*************** No Auth **********************/

app.use(routes.questions)
app.use(routes.responses)

// app.use(routes.logIn)
// app.use(routes.signUp)

/**************** Auth ************************/

// app.use(require('./modules/auth').auth)

/*****************  ***********************/

const handleErrors = (err, req, res, next) => {
	return res.status(500).json({
		status: 'error',
		message: err.message
	});
}

app.use(handleErrors);
// module.exports = app

app.listen(7878)