const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const Contact = require('./models/Contact');

const app = express();
const PORT = 3000;

// Połączenie z MongoDB (lokalnie lub podmień na MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint: odbiera formularz
app.post('/api/contact', async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Contact.findOne({ email });

    if (existing) {
      return res.status(200).json({ message: 'Cet e-mail est déjà enregistré.' });
    }

    const contact = new Contact({ email });
    await contact.save();

    const confirmUrl = `http://89.213.175.182:30080/api/confirm?email=${encodeURIComponent(email)}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmez votre participation - Vip Informatique',
      html: `
        <h2>Merci pour votre inscription !</h2>
        <p>Veuillez confirmer votre participation en cliquant ici :</p>
        <a href="${confirmUrl}">Confirmer mon adresse</a>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail de confirmation envoyé !" });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ message: 'Cet e-mail est déjà enregistré.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Endpoint: klient kliknął link potwierdzający
app.get('/api/confirm', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Lien invalide.');
  }

  const contact = await Contact.findOneAndUpdate(
    { email },
    { confirmed: true }
  );

  if (!contact) {
    return res.status(404).send('Adresse introuvable.');
  }

  res.send('<h1>✅ Merci, votre adresse est maintenant confirmée !</h1>');
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
