const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors');

const router = express();
router.use(cors({origin:true}));

//buscar por id
router.get('/patient/:id', async (req, res) => {
  const patient = await
  admin.firestore().collection('patients').doc(req.params.id).get();
  res.send(patient);
})

//listado de registros
router.get('/patients', async (req, res) => {
  const patients = await
  admin.firestore().collection('patients').get();
  var lista = [];
  patients.doc.forEach(doc => {
    lista.push({ id:doc.id, data: doc.data() })
  });
  res.send(lista);
});

//crear registro
router.post('/patient', async (req, res) => {
  const patient = await
  admin.firestore().collection('patients').doc(req.params.id)
  .add (req.body);
  res.send(patient)
})

//actualizazr registro
router.put('/patient/:id', async (req, res) => {
  const patient = await
  admin.firestore().collection('patients').doc(req.params.id)
  .update (req.body);
  res.send(patient)
})

//eliminar
router.delete('/patient/:id', async (req, res) => {
  const patient = await
  admin.firestore().collection('patients').doc(req.params.id)
  .delete (req.body);
  res.send(patient)
})

exports.test = functions.https.onRequest(router);
