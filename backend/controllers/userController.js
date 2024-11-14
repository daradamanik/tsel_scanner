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
    try {
        const userCollection = db.collection('users');
        const existingUser = await userCollection.where('email', '==', data.email).get();
        if(!existingUser.empty) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            const userRef = db.collection('users').doc();
            const newUser = new UserModel(data.email, data.name, data.password, data.role);
            await userRef.set(newUser.toFirestore())
            return res.status(200).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})

module.exports = app;