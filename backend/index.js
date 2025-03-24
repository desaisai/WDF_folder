const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const Employee = require('./models/employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Login route
app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        const user = await Employee.findOne({ email, password });
        
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Customize the welcome message based on userType
        const welcomeMessage = `Welcome, ${user.name}! You are logged in as a ${userType}.`;
        res.status(200).send(welcomeMessage);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error logging in');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
