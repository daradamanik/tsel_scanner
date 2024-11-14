const express = require('express');
const db = require('./firebase'); // Import the Firestore connection

const app = express();
app.use(express.json());

app.post('/add-data', async (req, res) => {
  try {
    const { field1, field2 } = req.body;
    const docRef = await db.collection('testCollection').add({
      field1,
      field2,
    });
    res.status(201).send(`Document added with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send(`Error adding document: ${error.message}`);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
