const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { selectedRoom, selectedMarker, query } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com', // Gmail 계정
            pass: 'your-email-password', // Gmail 비밀번호 또는 앱 비밀번호
        },
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: '회의실 예약 문의',
        text: `회의실: ${selectedRoom}\n보드마카: ${selectedMarker}\n문의사항: ${query}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
