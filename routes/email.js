const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
    const { to, subject, body } = req.body;

    res.send({
        to,
        subject,
        body
    })
})

module.exports = router;


// TODO : add server side validation
