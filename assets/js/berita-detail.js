// Data Berita (sama dengan di berita.js)
const newsData = [
  {
      id: 1,
      title: "Pelantikan Anggota Baru HIMASISKO Periode 2025",
      excerpt: "Acara pelantikan anggota baru HIMASISKO UNSRI dilaksanakan dengan meriah...",
      date: "15 JUN 2025",
      category: "kegiatan",
      image: "https://source.unsplash.com/random/600x400/?ceremony,1",
      content: `
          <p>Acara pelantikan anggota baru HIMASISKO UNSRI Kabinet Arunika Bhaskara telah dilaksanakan dengan sukses pada tanggal 15 Juni 2025 di Gedung Serba Guna Fakultas Ilmu Komputer. Acara ini dihadiri oleh seluruh anggota baru, pengurus harian, serta dosen pembina.</p>
          
          <img src="https://source.unsplash.com/random/800x500/?ceremony,2" alt="Moment Pelantikan">
          
          <p>Ketua HIMASISKO dalam sambutannya menyampaikan: "Selamat datang kepada anggota baru kami. Mari bersama-sama kita wujudkan visi misi HIMASISKO untuk menjadi himpunan yang inklusif, dedikatif, dan progresif."</p>
          
          <p>Acara dilanjutkan dengan penyematan pin dan pengucapan sumpah anggota oleh Ketua BPH Inti. Setelah pelantikan, diadakan ramah tamah dan games interaktif untuk mempererat kekeluargaan.</p>
          
          <h3>Daftar Kegiatan Setelah Pelantikan:</h3>
          <ul>
              <li>Orientasi Anggota Baru - 17 Juni 2025</li>
              <li>Pelatihan Dasar Kepemimpinan - 20 Juni 2025</li>
              <li>Kunjungan Departemen - 22 Juni 2025</li>
          </ul>
      `
  },
  // ... (data berita lainnya sama dengan sebelumnya)
];

// DOM Elements
const newsDetailContent = document.getElementById('news-detail-content');
const relatedNewsContainer = document.getElementById('related-news');

// Fungsi untuk menampilkan detail berita
function displayNewsDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = parseInt(urlParams.get('id'));
  
  const newsItem = newsData.find(item => item.id === newsId);
  
  if (!newsItem) {
      newsDetailContent.innerHTML = `
          <div class="error-message">
              <h2>Berita tidak ditemukan</h2>
              <p>Berita yang Anda cari tidak dapat ditemukan. Silakan kembali ke <a href="berita.html">halaman berita</a>.</p>
          </div>
      `;
      return;
  }
  
  newsDetailContent.innerHTML = `
      <img src="${newsItem.image}" alt="${newsItem.title}" class="news-header-image">
      <div class="news-detail-content">
          <div class="news-meta">
              <span class="news-date">${newsItem.date}</span>
              <span class="news-category">${getCategoryName(newsItem.category)}</span>
          </div>
          <h1 class="news-title">${newsItem.title}</h1>
          <div class="news-body">
              ${newsItem.content || `<p>${newsItem.excerpt}</p>`}
          </div>
      </div>
  `;
  
  // Tampilkan berita terkait
  displayRelatedNews(newsItem.category, newsItem.id);
}

// Fungsi untuk menampilkan berita terkait
function displayRelatedNews(category, currentId) {
  const relatedNews = newsData
      .filter(item => item.category === category && item.id !== currentId)
      .slice(0, 3); // Ambil maksimal 3 berita terkait
  
  if (relatedNews.length === 0) return;
  
  relatedNewsContainer.innerHTML = relatedNews.map(news => `
      <div class="related-card">
          <div class="related-image">
              <img src="${news.image}" alt="${news.title}" loading="lazy">
          </div>
          <div class="related-content">
              <h3 class="related-title">${news.title}</h3>
              <a href="berita-detail.html?id=${news.id}" class="related-link">
                  Baca Selengkapnya <i class='bx bx-chevron-right'></i>
              </a>
          </div>
      </div>
  `).join('');
}

// Helper function untuk nama kategori
function getCategoryName(category) {
  const categories = {
      'all': 'Semua',
      'kegiatan': 'Kegiatan',
      'prestasi': 'Prestasi',
      'pengumuman': 'Pengumuman',
      'event': 'Event'
  };
  return categories[category] || category;
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  displayNewsDetail();
  
  // Jika menggunakan sistem single page application:
  window.addEventListener('popstate', displayNewsDetail);
});