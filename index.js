const path = require('path');
const express = require('express');

const pageRouter = require('./routes/page');
const apiRouter = require('./routes/api')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRouter)
app.use('/api', apiRouter)


app.listen(port)