// Fungsi untuk menyapa user
function sapa() {
    let nama = prompt("Siapa nama Anda?");
    if (nama) {
        alert("Halo " + nama + "! Selamat datang di website saya! 😊");
        document.getElementById("nama-user").innerHTML = "Halo, " + nama + "! 👋";
    }
}

// Fungsi untuk mengubah warna background
function ubahWarna() {
    let warna = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    let randomWarna = warna[Math.floor(Math.random() * warna.length)];
    document.body.style.backgroundColor = randomWarna;
    alert("Background berubah jadi warna baru! 🎨");
}

// Fungsi untuk menambah makanan favorit
function tambahMakanan() {
    let makanan = prompt("Makanan favorit apa yang mau ditambah?");
    if (makanan) {
        let list = document.getElementById("list-makanan");
        let item = document.createElement("li");
        item.innerHTML = makanan;
        list.appendChild(item);
        alert("Makanan " + makanan + " berhasil ditambah! 🍽");
    }
}

// Pesan selamat datang saat website dibuka
window.onload = function() {
    setTimeout(function() {
        alert("Selamat datang! Website ini dibuat dengan HTML, CSS, dan JavaScript! 🚀");
    }, 1000);
}