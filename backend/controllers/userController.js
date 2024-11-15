const {db, admin} = require('../firebase')
const express = require('express');
const app = express();
const UserModel = require('../models/userModel')
// const { getAuth } = require('firebase-admin/auth');

app.post('/add-user', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status(400).json({ 
            message: 'Missing required fields. Name, email and password are required.' 
        });
    }
    try {
        const userCollection = db.collection('users');
        const existingUser = await userCollection.where('email', '==', data.email).get();
        if(!existingUser.empty) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            const userRef = db.collection('users').doc();
            const newUser = new UserModel(
                userRef.id,    // id
                data.name,     // name
                data.email,    // email
                data.password, // password
                data.role,     // role
                new Date() );
            await userRef.set(newUser.toFirestore())
            return res.status(200).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})

app.post('/login', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 
            message: 'Missing required fields. Email and password are required.' 
        });
    }
    try {
        const userCollection = db.collection('users');
        const userSnapshot = await userCollection.where('email', '==', data.email).get();

        if (userSnapshot.empty) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password !== data.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const user = new UserModel(
            userDoc.id,
            userData.name,
            userData.email, 
            userData.password,
            userData.role,
            userData.createdAt
        );

        return res.status(200).json({ 
            message: 'Login successful',
            user: user
        });

    } catch (error) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        });
    }
})

app.post('/auth/google-sign-in', async (req, res) => {
    try {
        const {idToken} = req.body;
        if(!idToken) {
            return res.status(400).json({message: 'Missing required fields. idToken is required.'});
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const {uid, email, name} = decodedToken;
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();
        let userData;
        if(!userDoc.exists) {
            const newUser = new UserModel (
                uid,
                name || 'Anonymous',
                email,
                null,
                UserModel.Roles.USER,
                new Date()
            )
            await userRef.set(newUser.toFirestore());
            userData = newUser;
        } else {
            const existingUser = userDoc.data();
            userData = new UserModel(
                uid,
                existingUser.name,
                existingUser.email,
                existingUser.password,
                existingUser.role,
                existingUser.createdAt,toDate()
            )
        }
        return res.status(200).json({message: 'Login successful', user: userData});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message});
    }
})

module.exports = app;