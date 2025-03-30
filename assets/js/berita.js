// Data Berita
const newsData = [
  {
      id: 1,
      title: "Pelantikan Anggota Baru HIMASISKO Periode 2025",
      excerpt: "Acara pelantikan anggota baru HIMASISKO UNSRI dilaksanakan dengan meriah di Gedung Serba Guna Fakultas Ilmu Komputer dengan dihadiri oleh seluruh anggota dan dosen pembina.",
      date: "15 JUN 2025",
      category: "kegiatan",
      image: "https://cdn.rri.co.id/berita/Palangkaraya/o/1728829675884-1000121079/nr5jxivvnk83ws4.jpeg"
  },
  {
      id: 2,
      title: "Tim HIMASISKO Raih Juara 1 Kompetisi IT Nasional",
      excerpt: "Tim perwakilan HIMASISKO berhasil menyabet juara 1 dalam kompetisi pengembangan sistem terintegrasi tingkat nasional yang diadakan di Jakarta.",
      date: "10 JUN 2025",
      category: "prestasi",
      image: "https://source.unsplash.com/random/600x400/?award,2"
  },
  {
      id: 3,
      title: "Seminar Nasional Future of Computer System",
      excerpt: "HIMASISKO UNSRI sukses menyelenggarakan seminar nasional dengan tema perkembangan sistem komputer masa depan dengan pembicara dari industri ternama.",
      date: "5 JUN 2025",
      category: "event",
      image: "https://source.unsplash.com/random/600x400/?seminar,3"
  },
  {
      id: 4,
      title: "Jadwal Kegiatan Bulan Juni 2025",
      excerpt: "Berikut adalah jadwal lengkap kegiatan HIMASISKO UNSRI untuk bulan Juni 2025. Catat tanggal-tanggal pentingnya dan jangan sampai ketinggalan.",
      date: "1 JUN 2025",
      category: "pengumuman",
      image: "https://source.unsplash.com/random/600x400/?calendar,4"
  },
  {
      id: 5,
      title: "Workshop Pemrograman Python Dasar",
      excerpt: "Divisi Akademik HIMASISKO menyelenggarakan workshop pemrograman Python dasar untuk meningkatkan kompetensi anggota dalam pengembangan software.",
      date: "28 MEI 2025",
      category: "kegiatan",
      image: "https://source.unsplash.com/random/600x400/?coding,5"
  },
  {
      id: 6,
      title: "Dua Anggota Terpilih sebagai Duta Kampus",
      excerpt: "Prestasi membanggakan diraih oleh dua anggota HIMASISKO yang terpilih sebagai duta kampus dalam seleksi ketat universitas.",
      date: "20 MEI 2025",
      category: "prestasi",
      image: "https://source.unsplash.com/random/600x400/?campus,6"
  },
  {
      id: 7,
      title: "Kunjungan Industri ke Perusahaan Teknologi",
      excerpt: "Anggota HIMASISKO melakukan kunjungan industri ke perusahaan teknologi ternama untuk belajar langsung tentang dunia kerja IT.",
      date: "15 MEI 2025",
      category: "kegiatan",
      image: "https://source.unsplash.com/random/600x400/?office,7"
  },
  {
      id: 8,
      title: "Peluncuran Aplikasi HIMASISKO Mobile",
      excerpt: "Aplikasi mobile resmi HIMASISKO akhirnya diluncurkan dengan berbagai fitur menarik untuk memudahkan anggota mengakses informasi.",
      date: "10 MEI 2025",
      category: "pengumuman",
      image: "https://source.unsplash.com/random/600x400/?app,8"
  },
  {
      id: 9,
      title: "Kerjasama dengan Himpunan Komputer Lain",
      excerpt: "HIMASISKO menjalin kerjasama dengan himpunan mahasiswa komputer dari universitas lain untuk pertukaran pengetahuan.",
      date: "5 MEI 2025",
      category: "event",
      image: "https://source.unsplash.com/random/600x400/?meeting,9"
  },
  {
      id: 10,
      title: "Pelatihan Public Speaking untuk Anggota",
      excerpt: "Divisi PSDM menyelenggarakan pelatihan public speaking untuk meningkatkan kemampuan presentasi dan komunikasi anggota.",
      date: "28 APR 2025",
      category: "kegiatan",
      image: "https://source.unsplash.com/random/600x400/?speech,10"
  },
  {
    id: 11,
    title: "Valentino Harley Kent berhasil membawa himasisko ke ajang dunia",
    excerpt: "Divisi PSDM menyelenggarakan pelatihan public speaking untuk meningkatkan kemampuan presentasi dan komunikasi anggota.",
    date: "28 APR 2025",
    category: "kegiatan",
    image: "https://source.unsplash.com/random/600x400/?speech,10"
  }
];

// Konfigurasi
const newsPerPage = 6;
let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';
let filteredNews = [...newsData];

// DOM Elements
const newsGrid = document.getElementById('news-grid');
const pagination = document.getElementById('pagination');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Fungsi untuk menampilkan berita
function displayNews() {
  newsGrid.innerHTML = '';
  
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);
  
  if (paginatedNews.length === 0) {
      newsGrid.innerHTML = '<p class="no-news">Tidak ada berita yang ditemukan</p>';
      return;
  }
  
  paginatedNews.forEach((news, index) => {
      const newsCard = document.createElement('article');
      newsCard.className = 'news-card';
      newsCard.innerHTML = `
          <div class="news-image">
              <img src="${news.image}" alt="${news.title}" loading="lazy">
              <div class="news-date">${news.date}</div>
          </div>
          <div class="news-content">
              <span class="news-category">${getCategoryName(news.category)}</span>
              <h3 class="news-title">${news.title}</h3>
              <p class="news-excerpt">${news.excerpt}</p>
              <a href="berita-detail.html?id=${news.id}" class="read-more">
                  Baca Selengkapnya <i class='bx bx-chevron-right'></i>
              </a>
          </div>
      `;
      newsGrid.appendChild(newsCard);
      
      // Animasi muncul berurutan
      setTimeout(() => {
          newsCard.classList.add('visible');
      }, 100 * index);
  });
}

// Fungsi untuk membuat pagination
function setupPagination() {
  pagination.innerHTML = '';
  const pageCount = Math.ceil(filteredNews.length / newsPerPage);
  
  if (pageCount <= 1) return;
  
  // Previous Button
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '<i class="bx bx-chevron-left"></i>';
  prevBtn.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
  prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          updatePage();
      }
  });
  pagination.appendChild(prevBtn);
  
  // Page Numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  if (startPage > 1) {
      const firstPageBtn = document.createElement('button');
      firstPageBtn.textContent = '1';
      firstPageBtn.className = `page-btn ${currentPage === 1 ? 'active' : ''}`;
      firstPageBtn.addEventListener('click', () => {
          currentPage = 1;
          updatePage();
      });
      pagination.appendChild(firstPageBtn);
      
      if (startPage > 2) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          ellipsis.style.padding = '0 10px';
          pagination.appendChild(ellipsis);
      }
  }
  
  for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      pageBtn.addEventListener('click', () => {
          currentPage = i;
          updatePage();
      });
      pagination.appendChild(pageBtn);
  }
  
  if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          ellipsis.style.padding = '0 10px';
          pagination.appendChild(ellipsis);
      }
      
      const lastPageBtn = document.createElement('button');
      lastPageBtn.textContent = pageCount;
      lastPageBtn.className = `page-btn ${currentPage === pageCount ? 'active' : ''}`;
      lastPageBtn.addEventListener('click', () => {
          currentPage = pageCount;
          updatePage();
      });
      pagination.appendChild(lastPageBtn);
  }
  
  // Next Button
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="bx bx-chevron-right"></i>';
  nextBtn.className = `page-btn ${currentPage === pageCount ? 'disabled' : ''}`;
  nextBtn.addEventListener('click', () => {
      if (currentPage < pageCount) {
          currentPage++;
          updatePage();
      }
  });
  pagination.appendChild(nextBtn);
}

// Fungsi untuk update halaman
function updatePage() {
  displayNews();
  setupPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update URL tanpa reload
  const url = new URL(window.location);
  url.searchParams.set('page', currentPage);
  if (currentCategory !== 'all') url.searchParams.set('category', currentCategory);
  if (currentSearch) url.searchParams.set('search', currentSearch);
  window.history.pushState({}, '', url);
  
  // Update breadcrumb
  updateBreadcrumb();
}

// Fungsi untuk filter dan search berita
function filterNews() {
  currentPage = 1;
  
  filteredNews = newsData.filter(news => {
      const matchesCategory = currentCategory === 'all' || news.category === currentCategory;
      const matchesSearch = news.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                           news.excerpt.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesCategory && matchesSearch;
  });
  
  updatePage();
}

// Fungsi untuk update breadcrumb
function updateBreadcrumb() {
  const breadcrumb = document.querySelector('.breadcrumb');
  let breadcrumbHtml = `<a href="index.html">Beranda</a> &gt; <a href="berita.html">Pojok Berita</a>`;
  
  if (currentCategory !== 'all') {
      breadcrumbHtml += ` &gt; <span>${getCategoryName(currentCategory)}</span>`;
  }
  
  if (currentSearch) {
      breadcrumbHtml += ` &gt; <span>Pencarian: "${currentSearch}"</span>`;
  }
  
  if (currentPage > 1) {
      breadcrumbHtml += ` &gt; <span>Halaman ${currentPage}</span>`;
  }
  
  breadcrumb.innerHTML = breadcrumbHtml;
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

// Event Listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      filterNews();
  });
});

searchBtn.addEventListener('click', () => {
  currentSearch = searchInput.value.trim();
  filterNews();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      currentSearch = searchInput.value.trim();
      filterNews();
  }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');
  
  if (pageParam && !isNaN(pageParam) && parseInt(pageParam) > 0) {
      currentPage = parseInt(pageParam);
  }
  
  if (categoryParam && ['all', 'kegiatan', 'prestasi', 'pengumuman', 'event'].includes(categoryParam)) {
      currentCategory = categoryParam;
      filterBtns.forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.category === currentCategory) {
              btn.classList.add('active');
          }
      });
  }
  
  if (searchParam) {
      currentSearch = searchParam;
      searchInput.value = searchParam;
  }
  
  filterNews();
});

// Handle back/forward navigation
window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  
  if (pageParam && !isNaN(pageParam) && parseInt(pageParam) > 0) {
      currentPage = parseInt(pageParam);
      updatePage();
  }
});