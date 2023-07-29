const express = require('express');
const cors = require('cors');	

const middleware = express.Router();
middleware.use(cors({
	origin: 'http://localhost:3000',
}));
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));


module.exports = middleware;