const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport'); 
/**
 * Routes import
 */
const usersRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.disable('x-powered-by');
app.set('port', port);
/**
 *  Routes Calls
 */
usersRoutes(app);

server.listen(3000, "10.22.128.168" || 'localhost', function () {
    console.log('Aplicacion de NodeJS ' + process.pid + ' iniciada');
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

app.get("/test", (req, res) => {
  res.send("Esta ruta es un test");
});

// Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})