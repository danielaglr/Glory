const express = require('express');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, QuerySnapshot, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../admin-config.json');
const router = express.Router();

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

router.get('/', async (req, res) => {
  try {
    res.json({
      status: 200,
      message: 'Request recieved'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  };
});

router.get('/:userID', async (req, res) => {
  const userRef = await db.collection('users').doc(`${req.params.userID}`).get();
  const user = userRef.data();
  res.send(user)
});

router.get('/:userID/lifts', async (req, res) => {
  const userRef = await db.collection('users').doc(`${req.params.userID}`).get();
  const liftsRef = userRef.data().lifts;
  res.send(liftsRef);
});

router.put('/', (req, res) => {
  res.set('Content-Type', 'application/json');

  db.collection('users').doc(`${req.body.userID}`).set({
    _id: req.body.userID,
    _created: req.body.accountCreated,
    email: req.body.email,
    name: req.body.name 
  });
});

router.put('/:userID/lifts', (req, res) => {
  res.set('Content-Type', 'application/json');

  db.collection('users').doc(`${req.params.userID}`).update({
    lifts: FieldValue.arrayUnion({
      lift: req.body.lift,
      reps: req.body.reps,
      weight: req.body.weight,
      time: new Date()
    })
  })
});

module.exports = router;