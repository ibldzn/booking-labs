const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/mongodb.connection");
const app = express();

const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());

app.use(express.json({ extended: false }));

connectDB();

app.use("/api/v1", require("./routes/auth.route"));

app.get("/labs", (req, res) => {
  res.json([
    {
      id: "1",
      name: "Laboratorium Imunologi",
      location: "Lantai 5",
      description:
        "Laboratorium ini digunakan untuk pemeriksaan darah yang bertujuan untuk mendeteksi awal adanya infeksi virus, memperkirakan status imun, dan pemantauan respon pasca vaksinasi.",
      // used_by?: string;
      images: [
        "https://news.unair.ac.id/wp-content/uploads/2019/12/26-2019-01-pengelolaan-laboratorium-660x405.jpg",
        "https://store.sirclo.com/blog/wp-content/uploads/2022/06/Banner-Blog-07-4.jpg",
      ],
    },
    {
      id: "2",
      name: "Laboratorium Parasitologi",
      location: "Lantai 5",
      description:
        "Laboratorium ini digunakan untuk pemeriksaan identifikasi parasit atau stadium dari parasit baik secara mikroskopis dengan atau tanpa pulasan, biakan, atau imunoesai.",
      used_by: "Kelas 1A",
    },
    {
      id: "3",
      name: "Laboratorium Hematologi",
      location: "Lantai 5",
      description:
        "Laboratorium ini digunakan untuk analisis pada sampel darah, seperti sifat fisik dan fungsi darah, penanganan sampel, pemeriksaan darah rutin, serta pemeriksaan hematologi klinik lainnya untuk menunjang diagnosis penyakit.",
      used_by: "Kelas 2A",
    },
    {
      id: "4",
      name: "Laboratorium Kimia Klinik",
      location: "Lantai 5",
      description:
        "Laboratorium ini digunakan untuk pemeriksaan terhadap sample (darah, urin, atau cairan tubuh lain) menggunakan metode reaksi kimia untuk mengetahui zat-zat yang terlarut dalamnya.",
    },
    {
      id: "5",
      name: "Laboratorium Sitohistoteknologi",
      location: "Lantai 6",
      description:
        "Ilmu yang mempelajari tentang preparasi sel-sel dan jaringan tubuh sampai menjadi sediaan mikroskopis yang digunakan untuk mendiagnosa adanya kelainan-kelainan dalam tubuh.",
    },
    {
      id: "6",
      name: "Laboratorium Kimia Dasar",
      location: "Lantai 6",
      description:
        "Laboratorium Kimia Dasar merupakan laboratorium yang kegiatannya meliputi penerapan dasar praktikum kimia, yaitu Penimbangan, Pemipetan, Pelarutan, Pembuatan Larutan Standard, Dan Identifikasi Bahan/Produk Secara Fisik Dan Kimia.",
    },
    {
      id: "7",
      name: "Laboratorium Biologi Molekular",
      location: "Lantai 6",
      description:
        "Laboratorium yang mempelajari dasar molekuler dari aktivitas biologi di dalam dan di antara sel, termasuk sintesis, modifikasi, mekanisme dan interaksi molekuler.",
    },
    {
      id: "8",
      name: "Laboratorium Mikrobiologi dan Bakteriologi",
      location: "Lantai 6",
      description:
        "Laboratorium yang mempelajari mikroorganisme. Objek kajiannya biasanya semua makhluk (hidup) yang perlu dilihat dengan mikroskop dan identifikasi bakteri yang menyebabkan penyakit pada manusia.",
    },
    {
      id: "9",
      name: "Laboratorium Virologi",
      location: "Lantai 6",
      description:
        "Laboratorium yang digunakan untuk melakukan pemeriksaan yang berkaitan dengan imunoserologi dan infeksi virus.",
    },
  ]);
});

app.get("/laboran", (req, res) => {
  res.json([
    {
      name: "Teni Amalia",
      phone: "0821-2151-2892",
    },
    {
      name: "Gina Agnia",
      phone: "0857-2446-6240",
    },
    {
      name: "Fretty Lendifah E N",
      phone: "0877-3781-9177",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
