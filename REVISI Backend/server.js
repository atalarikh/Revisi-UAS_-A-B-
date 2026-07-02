// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Mengizinkan frontend (yang beda port) untuk mengakses backend
app.use(express.json()); // Membaca data JSON dari frontend

// Simulasi Database Produk
const products = [
    { id: 1, name: "Celana jogger pendek pria/wanita", price: 80000, rating: "4.9", sold: "10rb", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Jaket Runing", price: 120000, rating: "4.9", sold: "9RB+", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Sepatu", price: 150000, rating: "4.8", sold: "10RB+", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=200&q=80" }
];

const orders = []; // Tabel pesanan

// 1. API Endpoint: Mengambil daftar produk
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. API Endpoint: Memproses Checkout
app.post('/api/checkout', (req, res) => {
    const { productId } = req.body;
    
    // Cari produk di server (Keamanan: jangan percaya harga dari frontend)
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
    }

    const biayaPenanganan = 2000;
    const total = product.price + biayaPenanganan;

    const newOrder = {
        orderId: "ORD-" + Math.floor(Math.random() * 100000),
        productName: product.name,
        totalPaid: total,
        date: new Date().toISOString()
    };
    
    orders.push(newOrder); // Simpan ke "database"
    console.log("Pesanan baru masuk:", newOrder);

    res.json({ success: true, data: newOrder });
});

// Jalankan Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log('✅ Backend Server berjalan di http://localhost:${PORT}');
});