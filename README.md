
# 🩺 Web Aplikasi Deteksi Pneumonia dari Citra X-Ray

Sebuah aplikasi web interaktif berbasis Flask yang memanfaatkan deep learning untuk mendeteksi kondisi pneumonia pada citra X-ray paru-paru. Sistem ini memungkinkan pengguna mengunggah gambar X-ray dan menerima hasil klasifikasi secara instan dengan antarmuka yang responsif dan ramah pengguna, termasuk dukungan dark mode.

Model klasifikasi yang digunakan telah dilatih pada dataset X-ray paru-paru dan mampu membedakan antara kondisi Normal dan Pneumonia, menjadikannya ideal untuk keperluan edukatif dan penelitian medis.

---

## 🔍 Fitur Utama

- 📷 **Upload Gambar**: Pengguna dapat mengunggah citra X-ray langsung melalui browser.
- 🧠 **Prediksi Cerdas**: Hasil klasifikasi dengan confidence score ditampilkan secara real-time.
- 🌙 **Mode Gelap**: Antarmuka mendukung tampilan dark mode untuk kenyamanan visual.
- 📊 **Visualisasi Output**: Menampilkan hasil prediksi dan confidence score dalam format yang mudah dipahami.
- 🖥️ **Penggunaan Lokal**: Aplikasi dapat dijalankan secara lokal dengan konfigurasi sederhana melalui Flask.

---

## 🗂️ Struktur Direktori

| Path / File             | Deskripsi                                                             |
|-------------------------|----------------------------------------------------------------------|
| `app.py`                | Script utama backend Flask yang menangani routing dan prediksi.      |
| `templates/`            | Template HTML (misal: index.html, result.html) untuk frontend.        |
| `static/`               | Berisi file statis (CSS, JS, ikon, dsb).                             |
| `model.h5`              | Model deep learning Keras dalam format .h5.                          |
| `class_names.json`      | Label kelas untuk hasil prediksi (Normal, Pneumonia, dll).           |
| `venv/`                 | Virtual environment (tidak perlu diikutsertakan dalam repositori).   |

---

## ✅ Prasyarat Sistem

- Python 3.7 atau lebih baru
- pip (Python package manager)
- Visual Studio Code atau editor lain (opsional namun direkomendasikan)

---

## ⚙️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Pindah ke Direktori Proyek

```bash
cd path/ke/Project_Flask
```

### 2. (Opsional) Buat Virtual Environment

```bash
python -m venv venv
```

### 3. Aktifkan Virtual Environment

#### Windows (Command Prompt):

```bash
.venv\Scripts\activate
```

#### Windows (PowerShell):

```bash
.venv\Scripts\Activate.ps1
```

#### macOS / Linux:

```bash
source venv/bin/activate
```

### 4. Install Dependensi

```bash
pip install -r requirements.txt
```

### 5. Jalankan Aplikasi Flask

```bash
python app.py
```

---

## 🚀 Akses Aplikasi

Buka aplikasi melalui browser setelah dijalankan:

👉 [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 📄 File Penting

| File/Folder              | Deskripsi                                                                 |
|--------------------------|--------------------------------------------------------------------------|
| `model.h5`               | File model deep learning hasil pelatihan (format Keras).                 |
| `class_names.json`       | Label klasifikasi untuk output model (misalnya: Normal, Pneumonia).      |
| `app.py`                 | Script backend utama berbasis Flask.                                     |
| `templates/index.html`   | Antarmuka untuk mengunggah gambar X-ray.                                 |
| `templates/result.html`  | Tampilan hasil prediksi dan confidence score.                            |

---

## 🛑 Catatan Penting
  - Konversi model ke format **`.tflite`** agar lebih ringan dan portable
  - Aplikasi sudah mendukung **Dark Mode**, cocok untuk presentasi atau penggunaan malam hari.

---

## 👨‍💻 Tim Pengembang

| Nama                  |
|-----------------------|
| Dina Pani Safira      | 
| Ekatri Yulisara       | 
| Nayla Husna Ryanda    | 
| Rahma Aliya           | 
| Rifsya Aulia          | 
