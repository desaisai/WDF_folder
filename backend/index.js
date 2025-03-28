const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const multer = require('multer');  // Multer for file uploads
const path = require('path');
const Employee = require('./models/employee');
const Model = require('./models/model');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');  // Store files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Register route
app.post('/register', async (req, res) => {
    console.log('Register request received:', req.body);
    const { name, email, password, userType } = req.body;

    try {
        const existingUser = await Employee.findOne({ email });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new Employee({ name, email, password, userType });
        await newUser.save();

        res.status(201).send('Registration successful');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    console.log('Login request received:', req.body);
    const { email, password, userType } = req.body;

    try {
        const user = await Employee.findOne({ email, password });

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        if (userType === 'brand') {
            res.status(200).send(`Welcome, ${user.name}! You are logged in as a brand.`);
        } else if (userType === 'model') {
            res.status(200).send({ message: 'Redirect to model registration page' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error logging in');
    }
});

// Model registration route with file uploads
app.post('/register-model', upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'photo', maxCount: 1 }
]), async (req, res) => {
    console.log('Model registration request received:', req.body, req.files);

    const { name, email, age, gender } = req.body;
    const certificatePath = req.files.certificate[0].path;
    const photoPath = req.files.photo[0].path;

    try {
        const newModel = new Model({
            name,
            email,
            age,
            gender,
            certificate: certificatePath,
            photo: photoPath
        });

        await newModel.save();
        res.status(201).send('Model registration successful');
    } catch (error) {
        console.error('Error registering model:', error);
        res.status(500).send('Error registering model');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
