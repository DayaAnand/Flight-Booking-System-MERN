const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/errorLogger');
const myRequestLogger = require('./utilities/requestLogger');
const cors = require("cors")
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(myRequestLogger);
app.use('/', router);
app.use(myErrorLogger);


app.listen(process.env.PORT || 1050);
console.log("Server started sucessfully!");


module.exports = app;