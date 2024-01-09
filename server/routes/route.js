const express = require('express');
const { SentEmail } = require('../controllers/SentEmail');
const Verify = require('../controllers/Verify');
const Login = require('../controllers/Login');
const logout = require('../controllers/logout');
const profile = require('../controllers/Profile');
const deleteAccount = require('../controllers/DeleteAccount');
const router = express.Router();
router.post('/', SentEmail)
router.get('/verify/:id/:token', Verify)
router.post('/login', Login);
router.get('/profile', profile);
router.delete('/logout', logout);
router.delete('/deleteAccount',deleteAccount)
module.exports = router;