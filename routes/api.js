const express = require('express');

const states = require('../data/states')

const router = express.Router();

router.get('/states', (req, res, next) => {
    res.json(states);
})

module.exports = router;
