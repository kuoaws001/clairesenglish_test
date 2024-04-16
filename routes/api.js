const express = require('express');

const data_states = require('../data/states')

const router = express.Router();

router.get('/states', (req, res, next) => {
    const states = data_states.sort(compareByName);
    res.json(states);
})

module.exports = router;

function compareByName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}
