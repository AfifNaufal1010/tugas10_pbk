<script setup>
// 10 Fakta/Informasi menarik seputar buku, mayoritas tentang buku Indonesia
const bookFacts = [
  {
    title: 'To Kill a Mockingbird',
    info: 'Novel klasik karya Harper Lee yang membahas isu rasial dan keadilan di Amerika Serikat, sangat berpengaruh di dunia sastra.',
    img: 'https://inc.mizanstore.com/aassets/img/com_cart/produk/covQT-26.jpg'
  },
  {
    title: 'The Great Gatsby',
    info: 'Karya F. Scott Fitzgerald ini adalah salah satu novel paling terkenal di dunia, menggambarkan kehidupan Amerika tahun 1920-an.',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg'
  },
  {
    title: 'Laskar Pelangi',
    info: 'Novel karya Andrea Hirata ini adalah salah satu buku terlaris di Indonesia dan telah diterjemahkan ke lebih dari 20 bahasa.',
    img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489732961i/1362193.jpg'
  },
  {
    title: 'Bumi Manusia',
    info: 'Karya Pramoedya Ananta Toer ini adalah bagian dari Tetralogi Buru dan dianggap sebagai salah satu novel terbaik Indonesia.',
    img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565658920i/1398034.jpg'
  },
  {
    title: 'Negeri 5 Menara',
    info: 'Novel karya Ahmad Fuadi ini menginspirasi banyak anak muda Indonesia untuk bermimpi tinggi dan menuntut ilmu.',
    img: 'https://s3-ap-southeast-1.amazonaws.com/ebook-previews/1682/10530/1.jpg'
  },
  {
    title: 'Sang Pemimpi',
    info: 'Buku kedua dari tetralogi Laskar Pelangi, juga karya Andrea Hirata, mengisahkan perjuangan meraih mimpi.',
    img: 'https://cdn.gramedia.com/uploads/items/Sang_Pemimpi_ofLeeOG.jpg'
  },
  {
    title: 'Supernova',
    info: 'Seri novel fiksi ilmiah dan filsafat karya Dee Lestari yang sangat populer di kalangan pembaca muda.',
    img: 'https://cdn.gramedia.com/uploads/items/9786022912705_kepingan_supernova.jpg'
  },
  {
    title: 'Ayat-Ayat Cinta',
    info: 'Novel Habiburrahman El Shirazy ini menjadi fenomena dan diadaptasi ke film yang sangat sukses.',
    img: 'https://www.gramedia.com/blog/content/images/2025/04/ayatayatcinta.jpg'
  },
  {
    title: 'Perahu Kertas',
    info: 'Novel remaja karya Dee Lestari yang mengangkat kisah cinta dan pencarian jati diri.',
    img: 'https://cdn.gramedia.com/uploads/items/ID_MIZ2016MTH03PKER_C.jpg'
  },
  {
    title: 'Harry Potter',
    info: 'Seri novel fantasi karya J.K. Rowling ini juga sangat populer di Indonesia dan dunia.',
    img: 'https://upload.wikimedia.org/wikipedia/id/5/56/Harry_potter_deathly_hallows_US.jpg'
  },
  {
    title: 'Dilan: Dia adalah Dilanku Tahun 1990',
    info: 'Novel karya Pidi Baiq yang sangat digemari remaja Indonesia dan diadaptasi ke film.',
    img: 'https://inc.mizanstore.com/aassets/img/com_cart/produk/covRN-145.jpg'
  },
  {
    title: 'Siti Nurbaya',
    info: 'Karya Marah Rusli ini adalah salah satu novel klasik Indonesia yang mengangkat tema perjodohan dan tradisi.',
    img: 'https://dpk.kepriprov.go.id/resources/cover/2016-07-29_SITI-NURBAYA-KASIH-TAK-SAMPAI-MARAH-RUSLI_022130.jpg'
  }
]
</script>

<template>
  <div class="facts-grid">
    <div v-for="(fact, idx) in bookFacts" :key="idx" class="fact-card">
      <img :src="fact.img" :alt="fact.title" class="fact-img" />
      <div class="fact-title">📚 {{ fact.title }}</div>
      <div class="fact-info">{{ fact.info }}</div>
    </div>
  </div>
  <blockquote>
    "Membaca adalah jendela dunia. Temukan inspirasi dari kisah-kisah luar biasa!"
  </blockquote>
</template>

<style scoped>
.dashboard-header {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 20;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 18px;
  padding-left: 18px;
  border-bottom: 6px solid #159c86;
  margin-top: 32px;
  box-shadow: 0 2px 8px 0 rgba(44,62,80,0.04);
}
h1 {
  color: #1abc9c;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 1px;
  /* border-bottom: 5px solid #1abc9c; */
  padding-bottom: 8px;
  margin-top: 0;
  padding-left: 0;
}
.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-bottom: 32px;
}
.fact-card {
  background: linear-gradient(120deg, #eafaf7 60%, #f8fafd 100%);
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(44,62,80,0.09);
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  min-height: 420px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.fact-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 6px 24px 0 rgba(44,62,80,0.13);
}
.fact-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #159c86;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}
.fact-info {
  color: #2c3e50;
  font-size: 1rem;
  line-height: 1.5;
}
.fact-img {
  width: 100%;
  height: 395px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px 0 rgba(44,62,80,0.08);
}
blockquote {
  background: #eafaf7;
  color: #159c86;
  border-left: 5px solid #1abc9c;
  padding: 16px 20px;
  border-radius: 10px;
  font-style: italic;
  margin-top: 24px;
  font-size: 1.1rem;
}
</style>

