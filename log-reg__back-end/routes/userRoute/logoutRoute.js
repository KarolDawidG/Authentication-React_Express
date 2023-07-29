const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', (req, res, next) => {
    console.log("Wylogowano")
        res.clearCookie('user');
        res.clearCookie('token');
        res.status(200).send('The server is working properly.');
    });

module.exports = router;
