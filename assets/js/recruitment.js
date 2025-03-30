// Recruitment Page Script
document.addEventListener("DOMContentLoaded", function() {
  // Status Recruitment (ubah ini untuk mengubah status)
  const recruitmentStatus = "open"; // bisa "open", "closed", atau "countdown"
  
  // Tanggal penting (format: YYYY-MM-DD)
  const registrationStart = "2025-08-28"; // Ini untuk menentukan tanggal pemmbukaan recruitment
  const registrationEnd = "2026-02-10";
  
  // Fungsi untuk menampilkan status recruitment
  function displayRecruitmentStatus() {
      const statusContainer = document.getElementById("recruitment-status");
      
      if (recruitmentStatus === "open") {
          statusContainer.innerHTML = `
              <div class="status-open">
                  <h2 class="status-title">PENDAFTARAN DIBUKA!</h2>
                  <p class="status-message">Pendaftaran anggota baru HIMASISKO UNSRI 2025 sedang dibuka. Segera daftarkan diri Anda sebelum tanggal ${formatDate(registrationEnd)}.</p>
                  <div class="cta-buttons">
                      <a href="views/form.html" class="cta-btn primary">Daftar Sekarang</a>
                  </div>
              </div>
          `;
      } else if (recruitmentStatus === "closed") {
          statusContainer.innerHTML = `
              <div class="status-closed">
                  <h2 class="status-title">PENDAFTARAN DITUTUP</h2>
                  <p class="status-message">Pendaftaran anggota baru HIMASISKO UNSRI 2025 telah ditutup. Nantikan pendaftaran berikutnya.</p>
              </div>
          `;
      } else if (recruitmentStatus === "countdown") {
          statusContainer.innerHTML = `
              <div class="status-countdown">
                  <h2 class="status-title">PENDAFTARAN AKAN SEGERA DIBUKA</h2>
                  <p class="status-message">Pendaftaran anggota baru HIMASISKO UNSRI 2025 akan dibuka pada tanggal ${formatDate(registrationStart)} pukul 08:00 WIB.</p>
                  <div class="countdown-container" id="countdown">
                      <div class="countdown-item">
                          <span class="countdown-number" id="days">00</span>
                          <span class="countdown-label">Hari</span>
                      </div>
                      <div class="countdown-item">
                          <span class="countdown-number" id="hours">00</span>
                          <span class="countdown-label">Jam</span>
                      </div>
                      <div class="countdown-item">
                          <span class="countdown-number" id="minutes">00</span>
                          <span class="countdown-label">Menit</span>
                      </div>
                      <div class="countdown-item">
                          <span class="countdown-number" id="seconds">00</span>
                          <span class="countdown-label">Detik</span>
                      </div>
                  </div>
              </div>
          `;
          
          // Jalankan countdown jika status countdown
          updateCountdown();
      }
  }
  
  // Fungsi untuk menampilkan CTA yang sesuai
  function displayRegistrationCTA() {
      const ctaContainer = document.getElementById("registration-cta");
      
      if (recruitmentStatus === "open") {
          ctaContainer.innerHTML = `
              <div class="cta-open">
                  <h2 class="cta-title">Siap Bergabung dengan HIMASISKO UNSRI?</h2>
                  <p>Jangan lewatkan kesempatan untuk menjadi bagian dari keluarga besar HIMASISKO UNSRI. Daftarkan diri Anda sekarang!</p>
              </div>
          `;
      } else {
          ctaContainer.innerHTML = `
              <div class="cta-closed">
                  <h2 class="cta-title">Pendaftaran Saat Ini Belum Dibuka</h2>
                  <p>Ikuti media sosial HIMASISKO UNSRI untuk mendapatkan informasi terbaru tentang pembukaan pendaftaran anggota baru.</p>
              </div>
          `;
      }
  }
  
 // Fungsi untuk menghitung countdown (JAM 24:00 WIB)
function updateCountdown() {
  // Set waktu buka jam 24:00 WIB (tengah malam)
  const countdownDate = new Date(`${registrationStart}T00:00:00+07:00`).getTime() + (24 * 60 * 60 * 1000);
  
  const countdownFunction = setInterval(function() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      
      // Jika waktu sudah tercapai
      if (distance < 0) {
          clearInterval(countdownFunction);
          const countdownElement = document.getElementById("countdown");
          if (countdownElement) {
              countdownElement.innerHTML = '<p style="margin-top:15px">Pendaftaran telah dibuka!</p>';
          }
          return;
      }
      
      // Hitung waktu
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update tampilan
      const updateElement = (id, value) => {
          const el = document.getElementById(id);
          if (el) el.textContent = value.toString().padStart(2, "0");
      };
      
      updateElement("days", days);
      updateElement("hours", hours);
      updateElement("minutes", minutes);
      updateElement("seconds", seconds);
  }, 1000);
} 

  // Fungsi untuk FAQ accordion
  function initFAQ() {
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
          const question = item.querySelector('.faq-question');
          
          question.addEventListener('click', () => {
              // Tutup semua item FAQ
              faqItems.forEach(faq => {
                  if (faq !== item && faq.classList.contains('active')) {
                      faq.classList.remove('active');
                  }
              });
              
              // Buka/tutup item yang diklik
              item.classList.toggle('active');
          });
      });
  }
  
  // Fungsi untuk memformat tanggal
  function formatDate(dateString) {
      const options = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Jakarta'
      };
      return new Date(`${dateString}T08:00:00`).toLocaleDateString('id-ID', options);
  }
  
  // Panggil semua fungsi yang diperlukan
  displayRecruitmentStatus();
  displayRegistrationCTA();
  initFAQ();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });
});