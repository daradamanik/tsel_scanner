const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())
app.use(express.static(__dirname))
const db = require('./firebase'); // Import the Firestore connection
app.use(express.json());

const userRoute = require('./controllers/userController')
app.use(`/user`, userRoute)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
