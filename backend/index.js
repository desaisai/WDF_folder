const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const Employee = require('./models/employee');  // Ensure path is correct

const app = express();
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.post('/register', async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log request data

        const { name, email, password } = req.body;

        // Check for existing email to avoid duplicates
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const newEmployee = new Employee({ name, email, password });

        await newEmployee.save();
        console.log('User saved:', newEmployee);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});

// Fetch all users
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Error fetching employees');
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
