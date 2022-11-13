const express = require('express');
const dbConnection = require('./config/dataBase/dbConnection');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json()); // parse the buffer into JSON
dbConnection(); // Database connection 

app.use('/user', require('./api/user.api'));
app.use('/note', require('./api/note.api'));

const globalMiddleware = (err, req, res, next) => {
    console.log('Global Middleware');
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.statusCode,
        Message: err.message,
        stack: (process.env.MODE_ENV == 'DEVELOPMENT') &&
            err.stack
    })
}

app.listen(8000, () => console.log("Listening on port 8000..."));