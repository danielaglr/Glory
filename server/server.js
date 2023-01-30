const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./admin-config.json');
const app = express();

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(console.log('Request recieved'));
});

app.get('/user', (req, res) => {
  res.send('Get request at /user');
});

app.put('/user', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');

  db.collection('users').doc(`${req.body.userID}`).set({
    _id: req.body.userID,
    email: req.body.email,
    name: req.body.name 
  });
});

app.listen(3001, () => {
  console.log(`Glory listening on port 3001`);
});