"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const util = require('util');

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

app.use(bodyParser.raw({type: "*/*"}));

const status = function(req, res, next) {
  res.status(req.get('X-HTTP-STATUS') || 200);
  res.type('application/json');
  next();
};

app.get('/', function (req, res) {
  res.send();
});

app.get('/get', status, function (req, res) {
  console.log('/get called');
  res.json(req.query);
});

app.post('/post', status, function (req, res) {
  console.log('/post called');
  var body = (isEmptyObject(req.body) || res.statusCode == 204) ? null : req.body;
  res.send(body);
});

app.get('/redirect', function (req, res) {
  console.log('/redirect called');
  res.redirect(302, req.get('X-LOCATION'));
});

app.use(function(error, req, res, next) {
  res.status(400).json({error: error.message});
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`));
