const express = require('express');
const routers = express.Router();
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routers.post('/login', sessionController.login);

routers.get('/ongs', ongController.index);
routers.post('/ongs', ongController.create);

routers.get('/profile', profileController.profile);

routers.get('/incidents', incidentController.index);
routers.post('/incidents', incidentController.create);
routers.delete('/incidents/:id', incidentController.delete);

module.exports = routers;
