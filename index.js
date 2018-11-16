"use strict";

const express = require('express');
const app = express();
const util = require('util');

app.use(express.json());
app.use(function(req, res, next) {
  res.status(req.get('X-HTTP-STATUS') || 200);
  next();
});

app.get('/*', function (req, res) {
  res.json(req.query);
});

app.post('/*', function (req, res) {
  res.json(req.body);
});

app.use(function(error, req, res, next) {
  res.status(400).json({error: error.message})
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`))
