const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, QuerySnapshot, FieldValue } = require('firebase-admin/firestore');
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

app.get('/user/:userID', async (req, res) => {
  const userRef = await db.collection('users').doc(`${req.params.userID}`).get();
  const user = userRef.data();
  res.send(user)
});

app.get('/user/:userID/notifications', async (req, res) => {
  const userRef = await db.collection('users').doc(`${req.params.userID}`).get();
  const notifRef = userRef.data().notifications;
  res.send(notifRef);
});

app.get('/user/:userID/lifts', async (req, res) => {
  const userRef = await db.collection('users').doc(`${req.params.userID}`).get();
  const liftsRef = userRef.data().lifts;
  res.send(liftsRef);
});

app.get('/user/:userID/friends/posts', async (req, res) => {
  res.set('Content-Type', 'application/json');
  const frLifts = [];
  const friendsRef = await db.collection('friends').doc(`${req.params.userID}`).get();
  await db.collection('lifts').where('author_uid', 'in', friendsRef.data().allFriends_uid).limit(10).orderBy('time', 'asc').get().then(function(querySnapshot) {
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((query) => {
        frLifts.push(query.data());
      })
    } else {
      console.log("No such document!");
    }
  })
  .catch(function(error) {
    console.log("Error getting document: ", error);
  });

  res.send(frLifts);
})

app.put('/user', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');

  db.collection('users').doc(`${req.body.userID}`).set({
    _id: req.body.userID,
    _created: req.body.accountCreated,
    email: req.body.email,
    name: req.body.name 
  });
});

app.put('/user/:userID/lifts', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');

  db.collection('users').doc(`${req.params.userID}`).update({
    lifts: FieldValue.arrayUnion({
      lift: req.body.lift,
      reps: req.body.reps,
      weight: req.body.weight,
      time: new Date()
    })
  })
})

app.listen(3001, () => {
  console.log(`Glory listening on port 3001`);
});