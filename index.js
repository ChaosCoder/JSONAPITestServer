"use strict";

const express = require('express');
const app = express();
const util = require('util');

app.use(express.json());

const status = function(req, res, next) {
  res.status(req.get('X-HTTP-STATUS') || 200);
  next();
};

app.get('/get', status, function (req, res) {
  res.json(req.query);
});

app.post('/post', status, function (req, res) {
  res.json(req.body);
});

app.get('/redirect', function (req, res) {
  res.redirect(302, req.get('X-LOCATION'));
});

app.use(function(error, req, res, next) {
  res.status(400).json({error: error.message})
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`))
