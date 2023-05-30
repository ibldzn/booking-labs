# Booking Labs

Cara menjalankan:

## Sebelumnya

1. Pastikan port 8080, 8081, 9000 (jika menggunakan Docker) tidak digunakan oleh aplikasi lain
2. Pastikan Docker sudah terinstall (jika menggunakan Docker)
3. Update file .env.example menjadi .env di direktori server
4. Isi .env dengan data yang dibutuhkan
5. Update juga file .env.example menjadi .env di direktori client
6. Isi .env dengan data yang dibutuhkan

## Tanpa Docker

1. Install Node.js di https://nodejs.org/en
2. Buka terminal, lalu masuk ke direktori project ini, dengan cara ketikkan `cd booking-labs`
3. Setelah itu, ketik `cd client` untuk masuk ke direktori client
4. Ketik `npm install` untuk menginstall dependencies
5. Ketik `npm run dev` untuk menjalankan client
6. Buka terminal baru, lalu masuk ke direktori project ini, dengan cara ketikkan `cd booking-labs`
7. Setelah itu, ketik `cd server` untuk masuk ke direktori server
8. Ketik `npm install` untuk menginstall dependencies
9. Ketik `npm run dev` untuk menjalankan server
10. Buka browser, lalu buka http://localhost:8080

## Dengan Docker

1. Install Docker di https://www.docker.com/get-started
2. Buka terminal, lalu masuk ke direktori project ini, dengan cara ketikkan `cd booking-labs`
3. Ketik `docker-compose up -d` untuk menjalankan client dan server
4. Buka browser, lalu buka http://localhost:8080
