const db = require('../firebase')
const express = require('express');
const app = express();
const UserModel = require('../models/userModel')

app.post('/add-user', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
})