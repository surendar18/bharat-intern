const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userRegistration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for serving the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for handling the registration form submission
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();
    res.send('Registration successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering the user');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});