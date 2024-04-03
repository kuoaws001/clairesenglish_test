const path = require('path')
const express = require('express');

const root = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(root, 'views', 'index.html'));
})

module.exports = router;
