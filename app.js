const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const passport = require("passport");
const multer = require("multer");
const dotenv = require("dotenv");
const chalk = require("chalk");

/*
* Load enviroment variables from .env file
*/
dotenv.load({ path: '.env' });

/*
* Controllers (route handlers)
*/
const homeController = require('./controllers/home');
/*
* Create Express server.
*/
const app = express();

/*
* Express configuration.
*/

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || '3000');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 } // two weeks in milliseconds
  }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/*
* Primary app routes.
*/
app.get('/', homeController.index);

/*
* Start Express server.
*/
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode',
        chalk.green('✓'), app.get('port'), app.get('env'));
});
module.exports = app;

