const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/submit-form', (req, res) => {
    const { Name, Email, Message } = req.body;

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your Gmail address
            pass: 'your-password' // Your Gmail password (consider using environment variables)
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'sukritsharmap@gmail.com',
        subject: 'New Message from Your Website',
        text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send message');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
