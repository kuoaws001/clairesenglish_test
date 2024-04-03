const path = require('path');
const express = require('express');

const homeRouter = require('./routes/home');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter)

app.listen(port)