const express = require('express');

const data_states = require('../data/states')

const router = express.Router();

router.get('/states', (req, res, next) => {
    const states = data_states.sort();
    res.json(states);
})

module.exports = router;
