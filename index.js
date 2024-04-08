const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const pageRouter = require('./routes/page');
const apiRouter = require('./routes/api');
const emailRouter = require('./routes/email');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRouter);
app.use('/api', apiRouter);
app.use('/emails', emailRouter);

app.listen(port)