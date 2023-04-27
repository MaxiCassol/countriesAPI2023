const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const Country = require('../models/Country');

const getAllCountries = require('../controllers/getCountries');
const getCountriesById = require('../controllers/getCountriesById');
const getCountriesByName = require('../controllers/getCountriesByName');
const postActivity = require('../controllers/postActivity');
const getActivities = require('../controllers/getActivities');
const deleteActivity = require('../controllers/deleteActivity')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//traemos la info de la db
router.get("/countries", getAllCountries);
router.get("/countries/name", getCountriesByName);
router.get("/countries/:id", getCountriesById);


// router.get("/activities", getActivities);
router.get("/activities", getActivities);
router.post("/activities", postActivity);
router.delete("/activities/:id", deleteActivity);


module.exports = router;
