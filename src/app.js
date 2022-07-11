require('dotenv').config();

const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/user-route')

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(userRoutes);

module.exports = app;