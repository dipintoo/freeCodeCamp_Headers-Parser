// Import module 'dotenv' untuk konfigurasi dari file .env
require('dotenv').config();

// Import module Express
const express = require('express');

// Inisialisasi aplikasi Express
const app = express();

// Mengaktifkan CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Beberapa browser lama menghadapi masalah dengan status 204

// Menggunakan file statis yang ada dalam folder 'public'
app.use(express.static('public'));

// Routing dasar untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Mengembalikan informasi IP address, bahasa, dan perangkat lunak pengguna
app.get('/api/whoami', (req, res) => {
  res.json({ 
    ipaddress: req.socket.remoteAddress, // Mendapatkan alamat IP pengguna
    language: req.headers['accept-language'], // Mendapatkan preferensi bahasa pengguna dari header
    software: req.headers['user-agent'] // Mendapatkan informasi perangkat lunak pengguna dari header
  });
});


// Mendengarkan permintaan pada port yang disediakan dalam file .env atau port 3000 jika tidak ada
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log(`Aplikasi Anda mendengarkan pada port ${listener.address().port}`);
});
