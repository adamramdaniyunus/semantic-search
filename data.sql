create table nama_perusahaan (
  id INTEGER not null, nama TEXT,
  PRIMARY KEY(id)
)

INSERT INTO nama_perusahaan (id, nama) VALUES
(1, 'PT Maju Jaya Abadi'),
(2, 'CV Sumber Rejeki Bersama'),
(3, 'PT Aman Sejahtera Sentosa'),
(4, 'Toko Bintang Terang'),
(5, 'PT Indo Makmur Elektronik'),
(6, 'UD Sinar Pagi Motor'),
(7, 'PT Cahaya Global Nusantara'),
(8, 'Kopi Rasa Indonesia'),
(9, 'PT Bumi Hijau Lestari'),
(10, 'CV Kreatif Solusi Digital'),
(11, 'Toko Sejahtera Abadi'),
(12, 'PT Arta Jaya Logistik'),
(13, 'Sumber Berkat Elektronik'),
(14, 'UD Makmur Sentosa'),
(15, 'PT Inti Data Teknologi'),
(16, 'PT Pilar Mandiri Properti'),
(17, 'CV Mitra Usaha Bersama'),
(18, 'Warung Sumber Nikmat'),
(19, 'PT Surya Gemilang Transport'),
(20, 'PT Mega Agro Nusantara');

create table nama_biner (
  id SERIAL PRIMARY KEY,
  nama_perusahaan TEXT,
  embedding VECTOR(384)
)

create extension if not exists vector;