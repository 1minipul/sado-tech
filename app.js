/**
 * Sado Tech Interactive Scripts
 * - Live scroll progress indicator (bottom center rainbow bar + percentage)
 * - Bilingual switcher (ID / EN) across all sections
 * - Interactive LMS Terminal tabs (Live Code Lab, Video Modul HD, AI Reviewer)
 * - Program category filters (All, Bootcamp, Online Class)
 * - Alumni detail lightbox modal
 * - Enrollment checkout modal with live promo code (SADOTECH20)
 * - Free Trial syllabus modal & Career Advisor modal
 * - Auto-rotating bottom-left live enrollment toast
 */

document.addEventListener('DOMContentLoaded', () => {
  /* =========================================================================
     1. Scroll Progress Bar & Active Section Highlighting
     ========================================================================= */
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const dockLinks = document.querySelectorAll('.floating-dock-left .dock-btn');
  const headerLinks = document.querySelectorAll('.header-nav a');
  const trackedSections = ['hero', 'demo', 'programs', 'alumni', 'dokumentasi', 'pricing'];

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))) : 0;

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${pct}%`;

    // Determine active section
    let current = 'hero';
    for (const id of trackedSections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 220) {
        current = id;
      }
    }

    dockLinks.forEach((link) => {
      const target = link.getAttribute('data-section');
      const isMatch = target === current || (current === 'programs' && target === 'demo');
      link.classList.toggle('active', isMatch);
    });

    headerLinks.forEach((link) => {
      const hrefId = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', hrefId === current);
    });
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  /* =========================================================================
     2. Bilingual Switcher (Indonesian <-> English)
     ========================================================================= */
  const translations = {
    id: {
      nav_programs: 'Program',
      nav_demo: 'Demo LMS',
      nav_alumni: 'Alumni',
      nav_docs: 'Dokumentasi',
      nav_pricing: 'Paket Harga',
      badge_1: '🛡️ KURIKULUM UPDATE 2026',
      badge_2: '⚡ AI CAREER MENTOR',
      badge_3: '💻 100% PROJECT-BASED',
      hero_line1: 'Sado Tech.',
      hero_line2: 'Upgrade Skill Tech',
      hero_line3: 'Lebih Cepat.',
      hero_highlight: 'CERDAS & TERARAH',
      hero_subtitle:
        'Sado Tech — Platform kelas online & pelatihan bootcamp teknologi terbaik di Indonesia: Full-Stack Web, AI Engineering, UI/UX Design, dan Data Science bersama mentor praktisi industri.',
      cta_syllabus: '⬇ AMBIL SILABUS GRATIS',
      cta_bootcamp: 'GABUNG BOOTCAMP →',
      cta_video: 'TONTON PREVIEW KELAS ▶',
      stat_1: 'Alumni & Siswa Aktif',
      stat_2: 'Mentoring & Komunitas',
      stat_3: 'Lulusan Terserap Kerja',
      live_badge: 'LIVE CODING...',
      subtag_1: 'ANTI-BINGUNG',
      subtag_2: 'MENTOR PRO',
      subtag_3: 'SERTIFIKAT RESMI',
      batch_info: 'Batch 14 dibuka • Kuota terbatas',
      yt_sub: 'Channel Edukasi, Tutorial Coding & Bedah Portofolio Resmi',
      yt_btn: '▶ SUBSCRIBE CHANNEL KAMI',
      demo_title: 'Demo Platform & Kelas Interaktif',
      demo_subtitle:
        'Rasakan langsung pengalaman belajar di LMS Sado Tech: ngoding di live code lab, tonton modul HD, dan uji kode bersama AI Code Reviewer.',
      tab_codelab: '💻 Live Code Lab',
      tab_video: '🎬 Video Modul HD',
      tab_ai: '🤖 AI Code Reviewer',
      mentor_note:
        '"Struktur API kamu sudah bersih! Coba tambahkan validasi skema Zod di endpoint pendaftaran agar aman dari input kosong."',
      ai_prompt_label:
        'Pilih kasus kode di bawah untuk melihat bagaimana AI Mentor Sado Tech mengoreksi tugasmu secara instan:',
      prog_title: 'Pilihan Kelas Online & Bootcamp',
      prog_subtitle:
        'Kurikulum disusun bersama Tech Lead dari perusahaan teknologi ternama agar skill kamu langsung relevan dengan kebutuhan industri.',
      filter_all: 'Semua Program',
      filter_bootcamp: 'Bootcamp Intensif',
      filter_online: 'Kelas Online Mandiri',
      step1_title: 'Pilih Jalur & Kelas',
      step1_desc: 'Tentukan kelas online mandiri atau bootcamp live intensif sesuai target karier dan waktumu.',
      step2_title: 'Bangun Portofolio Nyata',
      step2_desc: 'Kerjakan project riil dengan kode terstruktur & dapatkan feedback 1-on-1 dari mentor senior.',
      step3_title: 'Raih Sertifikat & Karier',
      step3_desc: 'Dapatkan sertifikat resmi, bedah CV, simulasi interview, dan akses ke 120+ hiring partner.',
      see_pricing: 'LIHAT HARGA & PAKET 🏷️',
      alumni_title: 'Kisah Sukses & Bukti Alumni',
      alumni_subtitle:
        'Bukti nyata kelulusan, testimoni chat, dan penyaluran kerja peserta. Klik kartu untuk melihat detail.',
      docs_title: 'Dokumentasi Kelas & Pelatihan',
      docs_subtitle:
        'Momen praktik langsung, presentasi prototipe IoT & teknologi, serta kebersamaan peserta bersama mentor Sado Tech. Klik foto untuk memperbesar.',
      doc1_tag: 'PRAKTIK IOT',
      doc1_title: 'Presentasi Prototipe Smart Home',
      doc1_desc: 'Peserta memamerkan hasil project maket & diagram rangkaian bersama mentor.',
      doc2_tag: 'SESI KELAS',
      doc2_title: 'Kebersamaan Kelas Tatap Muka',
      doc2_desc: 'Antusiasme peserta bootcamp menyelesaikan tantangan proyek mingguan.',
      doc3_tag: 'TIM LAB',
      doc3_title: 'Squad Engineering Lab',
      doc3_desc: 'Kolaborasi tim peserta dalam perakitan sistem dan pemrograman terapan.',
      doc4_tag: 'DEMO DAY',
      doc4_title: 'Demo Day & Apresiasi Karya',
      doc4_desc: 'Penutupan sesi praktik dengan hasil karya nyata siap portofolio.',
      pricing_title: 'Investasi Untuk Masa Depanmu',
      pricing_subtitle:
        'Pilih paket belajar — kelas online mandiri atau bootcamp intensif dengan jaminan bimbingan karier.',
      plan1_name: 'Kelas Online Mandiri',
      plan1_desc: 'Akses penuh 1 jalur kelas video HD — sekali bayar, akses selamanya.',
      p1_f1: '120+ video materi HD terstruktur dari dasar',
      p1_f2: 'Source code project & e-book ringkasan lengkap',
      p1_f3: 'Grup diskusi Discord & Telegram 24/7',
      p1_f4: 'Sertifikat kelulusan digital terverifikasi',
      plan1_cta: 'MULAI BELAJAR ⚡',
      popular_badge: 'PALING POPULER',
      plan2_name: 'Bootcamp Intensif',
      plan2_desc: 'Program 16 minggu live class + portofolio + career coaching (bisa cicilan 0%).',
      p2_f1: 'Live session interaktif 3x seminggu bersama Mentor Pro',
      p2_f2: 'Review kode 1-on-1 & 5+ project portofolio industri',
      p2_f3: 'Bedah CV, LinkedIn & simulasi technical interview',
      p2_f4: 'Penyaluran kerja ke 120+ perusahaan hiring partner',
      plan2_cta: 'AMBIL KURSI PRO 🛒',
      plan3_name: 'Privat & Corporate Track',
      plan3_desc: 'Bimbingan privat 1-on-1 atau pelatihan khusus tim perusahaan per bulan.',
      p3_f1: 'Jadwal fleksibel eksklusif bersama Senior Tech Lead',
      p3_f2: 'Kurikulum custom sesuai kebutuhan karier atau tim IT',
      p3_f3: 'Audit arsitektur kode & bimbingan capstone project',
      p3_f4: 'Laporan evaluasi progres berkala & sertifikat resmi',
      plan3_cta: 'KONSULTASI TRACK ⚡',
      faq_title: 'Pertanyaan Yang Sering Diajukan',
      faq_subtitle: 'Masih ragu memulai? Cek jawaban cepat seputar sistem belajar di Sado Tech.',
      faq1_q: 'Apakah pemula tanpa background IT bisa ikut bootcamp Sado Tech?',
      faq1_a:
        'Bisa banget! Lebih dari 62% alumni Sado Tech berasal dari jurusan non-IT. Kurikulum dimulai dari fundamental logika pemrograman atau dasar desain hingga level siap kerja dengan pendampingan mentor.',
      faq2_q: 'Apa perbedaan Kelas Online Mandiri dan Bootcamp Intensif?',
      faq2_a:
        'Kelas Online Mandiri cocok bagi kamu yang ingin belajar fleksibel lewat video HD kapan saja. Sedangkan Bootcamp Intensif memiliki jadwal tatap muka live via Zoom 3x seminggu, bimbingan project riil, mock interview, dan akses penyaluran kerja ke 120+ partner.',
      faq3_q: 'Apakah tersedia pembayaran cicilan atau kode promo?',
      faq3_a:
        'Ya! Untuk paket Bootcamp Intensif tersedia cicilan 0% hingga 6 bulan. Kamu juga bisa menggunakan kode promo SADOTECH20 saat pendaftaran di website ini untuk potongan biaya 20%.',
      footer_about:
        'PT Sado Tech Edukasi Nusantara — Akselerator talenta digital Indonesia melalui kelas online terstruktur dan pelatihan bootcamp berbasis project industri.',
      footer_programs: 'Program Unggulan',
      footer_contact: 'Hubungi Kami',
      footer_promo: 'Gunakan Promo: SADOTECH20',
      footer_made: 'Dibangun untuk mencetak talenta teknologi siap industri.',
      float_demo: '⬇ COBA KELAS',
      free_tag: 'GRATIS',
    },
    en: {
      nav_programs: 'Programs',
      nav_demo: 'LMS Demo',
      nav_alumni: 'Alumni',
      nav_docs: 'Documentation',
      nav_pricing: 'Pricing',
      badge_1: '🛡️ 2026 UPDATED CURRICULUM',
      badge_2: '⚡ AI CAREER MENTOR',
      badge_3: '💻 100% PROJECT-BASED',
      hero_line1: 'Sado Tech.',
      hero_line2: 'Level Up Your Tech',
      hero_line3: 'Career Fast.',
      hero_highlight: 'SMART & GUIDED',
      hero_subtitle:
        'Sado Tech — Top-rated online courses & intensive tech bootcamp platform: Full-Stack Web, AI Engineering, UI/UX Design, and Data Science led by industry practitioners.',
      cta_syllabus: '⬇ GET FREE SYLLABUS',
      cta_bootcamp: 'JOIN BOOTCAMP →',
      cta_video: 'WATCH CLASS DEMO ▶',
      stat_1: 'Active Students & Alumni',
      stat_2: 'Mentoring & Community',
      stat_3: 'Job Placement Rate',
      live_badge: 'LIVE CODING...',
      subtag_1: 'BEGINNER FRIENDLY',
      subtag_2: 'PRO MENTORS',
      subtag_3: 'VERIFIED CERT',
      batch_info: 'Batch 14 open • Limited seats',
      yt_sub: 'Official Coding Tutorials, Career Tips & Portfolio Reviews',
      yt_btn: '▶ SUBSCRIBE OUR CHANNEL',
      demo_title: 'Interactive LMS & Classroom Demo',
      demo_subtitle:
        'Experience learning inside Sado Tech LMS: write code in the live sandbox, browse HD video modules, and test instant AI Code Reviews.',
      tab_codelab: '💻 Live Code Lab',
      tab_video: '🎬 HD Video Modules',
      tab_ai: '🤖 AI Code Reviewer',
      mentor_note:
        '"Your API structure looks clean! Try adding Zod schema validation on the signup endpoint to guard against empty payloads."',
      ai_prompt_label:
        'Pick a code scenario below to preview how Sado Tech AI Mentor reviews your assignments in real time:',
      prog_title: 'Online Classes & Bootcamp Tracks',
      prog_subtitle:
        'Curriculum co-designed with Senior Tech Leads so your skills match real-world engineering teams.',
      filter_all: 'All Programs',
      filter_bootcamp: 'Intensive Bootcamp',
      filter_online: 'Self-Paced Online',
      step1_title: 'Choose Your Track',
      step1_desc: 'Pick a flexible self-paced online course or an intensive live bootcamp aligned with your career goal.',
      step2_title: 'Build Real Projects',
      step2_desc: 'Ship production-grade portfolio apps with clean code and 1-on-1 feedback from senior mentors.',
      step3_title: 'Get Certified & Hired',
      step3_desc: 'Receive an official certificate, CV review, mock interviews, and access to 120+ hiring partners.',
      see_pricing: 'SEE PRICING & PLANS 🏷️',
      alumni_title: 'Alumni Stories & Proof',
      alumni_subtitle:
        'Verified graduation certificates, placement messages, and student stories. Click any card for details.',
      docs_title: 'Training & Class Documentation',
      docs_subtitle:
        'Real hands-on practice moments, IoT & tech prototype demos, and cohort sessions with Sado Tech mentors. Click any photo to zoom.',
      doc1_tag: 'IOT PRACTICE',
      doc1_title: 'Smart Home Prototype Presentation',
      doc1_desc: 'Students showcase miniature prototypes and circuit diagrams with their mentor.',
      doc2_tag: 'CLASS SESSION',
      doc2_title: 'In-Person Bootcamp Cohort',
      doc2_desc: 'Bootcamp participants collaborating to complete weekly engineering challenges.',
      doc3_tag: 'HARDWARE LAB',
      doc3_title: 'Engineering Lab Squad',
      doc3_desc: 'Team collaboration on applied programming and hardware system assembly.',
      doc4_tag: 'DEMO DAY',
      doc4_title: 'Demo Day & Project Showcase',
      doc4_desc: 'Wrapping up hands-on sessions with portfolio-ready working prototypes.',
      pricing_title: 'Invest In Your Future',
      pricing_subtitle:
        'Choose your learning plan — flexible online track or full career-ready bootcamp.',
      plan1_name: 'Self-Paced Online Class',
      plan1_desc: 'Full lifetime access to 1 structured HD video curriculum — one-time payment.',
      p1_f1: '120+ structured HD lessons from scratch',
      p1_f2: 'Complete project source code & PDF study guides',
      p1_f3: '24/7 Discord & Telegram learning community',
      p1_f4: 'Verified digital graduation certificate',
      plan1_cta: 'START LEARNING ⚡',
      popular_badge: 'MOST POPULAR',
      plan2_name: 'Intensive Bootcamp',
      plan2_desc: '16-week live mentorship + portfolio projects + career coaching (0% installment available).',
      p2_f1: '3x weekly interactive live classes with Pro Mentors',
      p2_f2: '1-on-1 code review & 5+ real-world portfolio apps',
      p2_f3: 'CV, LinkedIn makeover & technical mock interviews',
      p2_f4: 'Direct job referral to 120+ hiring partners',
      plan2_cta: 'GET PRO SEAT 🛒',
      plan3_name: 'Private & Corporate Track',
      plan3_desc: 'Exclusive 1-on-1 coaching or tailored engineering team upskilling per month.',
      p3_f1: 'Flexible 1-on-1 schedule with a Senior Tech Lead',
      p3_f2: 'Custom syllabus tailored to your career or team stack',
      p3_f3: 'Architecture audit & capstone project guidance',
      p3_f4: 'Regular progress reports & official certification',
      plan3_cta: 'BOOK CONSULTATION ⚡',
      faq_title: 'Frequently Asked Questions',
      faq_subtitle: 'Have questions before starting? Check quick answers about learning at Sado Tech.',
      faq1_q: 'Can beginners without an IT degree join Sado Tech bootcamp?',
      faq1_a:
        'Absolutely! Over 62% of Sado Tech alumni started with zero coding or design background. Our curriculum guides you step by step from fundamentals to job-ready mastery.',
      faq2_q: 'What is the difference between Online Class and Intensive Bootcamp?',
      faq2_a:
        'Self-Paced Online Class is ideal if you want flexible lifetime access to HD lessons. Intensive Bootcamp adds 3x weekly live Zoom sessions, 1-on-1 project reviews, mock interviews, and job placement support.',
      faq3_q: 'Do you offer installment plans or promo discounts?',
      faq3_a:
        'Yes! 0% installment up to 6 months is available for Intensive Bootcamp. You can also apply promo code SADOTECH20 in the checkout modal for an instant 20% discount.',
      footer_about:
        'Sado Tech Education — Empowering digital talent through structured online courses and project-driven tech bootcamps.',
      footer_programs: 'Featured Tracks',
      footer_contact: 'Contact Us',
      footer_promo: 'Promo Code: SADOTECH20',
      footer_made: 'Built to launch industry-ready tech careers.',
      float_demo: '⬇ FREE CLASS',
      free_tag: 'FREE',
    },
  };

  let currentLang = 'id';
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'id' ? 'en' : 'id';
      document.documentElement.lang = currentLang;
      if (langLabel) langLabel.textContent = currentLang === 'id' ? 'ID / EN' : 'EN / ID';

      const dict = translations[currentLang];
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });
    });
  }

  /* =========================================================================
     3. Interactive LMS Terminal Showcase
     ========================================================================= */
  const termTabBtns = document.querySelectorAll('.term-tab-btn');
  const termPanels = document.querySelectorAll('.term-panel');

  termTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      termTabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      termPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === `panel-${targetTab}`);
      });
    });
  });

  // Run Live Code button simulation
  const runCodeBtn = document.getElementById('runCodeBtn');
  const consoleOutput = document.getElementById('consoleOutput');
  if (runCodeBtn && consoleOutput) {
    runCodeBtn.addEventListener('click', () => {
      consoleOutput.innerHTML = `<div style="color:#ffe600;">$ npx tsx bootcamp/module-04/career-api.ts</div><div style="color:#94a3b8;">Mengkompilasi modul TypeScript...</div>`;
      setTimeout(() => {
        consoleOutput.innerHTML = `
          <div style="color:#ffe600;">$ npx tsx bootcamp/module-04/career-api.ts</div>
          <div style="margin-top:6px; color:#8cff2e;">✓ Build sukses dalam 142ms</div>
          <div style="margin-top:6px; color:#00e5ff;">{</div>
          <div style="padding-left:14px;">student: "Raka Pratama",</div>
          <div style="padding-left:14px;">track: "Full-Stack & AI Engineering",</div>
          <div style="padding-left:14px;">readinessScore: "96% — SIAP KERJA 🚀"</div>
          <div style="color:#00e5ff;">}</div>
        `;
      }, 360);
    });
  }

  // Video chapter switcher
  const chapterItems = document.querySelectorAll('.chapter-item');
  const activeChapterTag = document.getElementById('activeChapterTag');
  const activeChapterTitle = document.getElementById('activeChapterTitle');
  const activeChapterTime = document.getElementById('activeChapterTime');

  chapterItems.forEach((item) => {
    item.addEventListener('click', () => {
      chapterItems.forEach((c) => c.classList.remove('active'));
      item.classList.add('active');
      if (activeChapterTag) activeChapterTag.textContent = item.getAttribute('data-tag');
      if (activeChapterTitle) activeChapterTitle.textContent = item.getAttribute('data-title');
      if (activeChapterTime) activeChapterTime.textContent = item.getAttribute('data-time');
    });
  });

  // AI Code Reviewer switcher
  const aiResponses = {
    sql: `<strong style="color:#00e5ff; display:block; margin-bottom:6px;">⚡ Diagnosa AI Mentor — Query SQL:</strong>
      Ditemukan <code>SELECT *</code> tanpa indeks pada kolom <code>user_id</code>. Tambahkan komposit index <code>CREATE INDEX idx_enroll_user ON enrollments(user_id, created_at DESC)</code> untuk memangkas waktu query dari 420ms menjadi 8ms.`,
    react: `<strong style="color:#ff2e93; display:block; margin-bottom:6px;">⚡ Diagnosa AI Mentor — React Hook:</strong>
      Fungsi <code>fetchCourses()</code> di dalam <code>useEffect</code> memicu update state tanpa dependency array <code>[]</code>. Bungkus dengan <code>useCallback</code> dan tambahkan dependency array agar tidak terjadi infinite re-render.`,
    ui: `<strong style="color:#ffe600; display:block; margin-bottom:6px;">⚡ Diagnosa AI Mentor — Audit UI/UX:</strong>
      Rasio kontras tombol CTA sekunder saat ini 3.1:1 (di bawah standar WCAG AA 4.5:1). Gunakan teks <code>#080810</code> di atas background <code>#00E5FF</code> untuk keterbacaan optimal 12.6:1.`,
  };

  const aiChips = document.querySelectorAll('.ai-chip');
  const aiReviewOutput = document.getElementById('aiReviewOutput');
  aiChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      aiChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const key = chip.getAttribute('data-case');
      if (aiReviewOutput && aiResponses[key]) {
        aiReviewOutput.innerHTML = aiResponses[key];
      }
    });
  });

  // YouTube Subscribe interactive toggle
  const subscribeBtn = document.getElementById('subscribeBtn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      const subscribed = subscribeBtn.classList.toggle('subscribed');
      if (subscribed) {
        subscribeBtn.style.background = '#16a34a';
        subscribeBtn.textContent = '✓ SUBSCRIBED • @SADOTECHACADEMY';
      } else {
        subscribeBtn.style.background = '#dc2626';
        subscribeBtn.textContent = translations[currentLang].yt_btn;
      }
    });
  }

  /* =========================================================================
     4. Program Category Filters
     ========================================================================= */
  const filterPills = document.querySelectorAll('.filter-pill');
  const programCards = document.querySelectorAll('.program-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      programCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });

  /* =========================================================================
     5. FAQ Accordion
     ========================================================================= */
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  /* =========================================================================
     6. Modals Management (Enroll, Trial, Alumni Lightbox, Mentor Chat)
     ========================================================================= */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close-modal')));
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });

  // Enrollment Modal + Live Promo Code
  const enrollPlan = document.getElementById('enrollPlan');
  const enrollTrack = document.getElementById('enrollTrack');
  const enrollPromo = document.getElementById('enrollPromo');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoFeedback = document.getElementById('promoFeedback');
  const enrollTotalPrice = document.getElementById('enrollTotalPrice');
  const enrollForm = document.getElementById('enrollForm');
  const enrollSuccess = document.getElementById('enrollSuccess');
  const enrollTicketText = document.getElementById('enrollTicketText');
  let discountRate = 0;

  function formatRupiah(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
  }

  function updateEnrollPrice() {
    if (!enrollPlan || !enrollTotalPrice) return;
    const opt = enrollPlan.options[enrollPlan.selectedIndex];
    const basePrice = parseInt(opt.getAttribute('data-price') || '2400000', 10);
    const finalPrice = Math.round(basePrice * (1 - discountRate));
    enrollTotalPrice.textContent = formatRupiah(finalPrice);
  }

  if (enrollPlan) enrollPlan.addEventListener('change', updateEnrollPrice);

  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
      const code = (enrollPromo.value || '').trim().toUpperCase();
      if (code === 'SADOTECH20') {
        discountRate = 0.2;
        promoFeedback.style.color = '#16a34a';
        promoFeedback.textContent = '✓ Kode promo SADOTECH20 aktif! Diskon 20% diterapkan.';
      } else {
        discountRate = 0;
        promoFeedback.style.color = '#dc2626';
        promoFeedback.textContent = 'Kode promo tidak ditemukan. Coba masukkan: SADOTECH20';
      }
      updateEnrollPrice();
    });
  }

  document.querySelectorAll('.open-enroll-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      const track = btn.getAttribute('data-track');
      if (enrollForm) enrollForm.style.display = 'block';
      if (enrollSuccess) enrollSuccess.style.display = 'none';
      if (plan && enrollPlan) {
        Array.from(enrollPlan.options).forEach((opt) => {
          if (opt.value === plan) enrollPlan.value = plan;
        });
      }
      if (track && enrollTrack) {
        Array.from(enrollTrack.options).forEach((opt) => {
          if (opt.value === track) enrollTrack.value = track;
        });
      }
      updateEnrollPrice();
      openModal('enrollModal');
    });
  });

  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('enrollName').value.trim();
      const email = document.getElementById('enrollEmail').value.trim();
      const plan = enrollPlan.value;
      const track = enrollTrack.value;
      const total = enrollTotalPrice.textContent;
      enrollForm.style.display = 'none';
      enrollSuccess.style.display = 'block';
      enrollTicketText.innerHTML = `Halo <strong>${name}</strong>, pendaftaran kamu untuk <strong>${plan}</strong> (Jalur: <strong>${track}</strong>) dengan total <strong>${total}</strong> telah dicatat! Instruksi aktivasi LMS dikirim ke <strong>${email}</strong>.`;
    });
  }

  // Free Trial Modal
  const trialForm = document.getElementById('trialForm');
  const trialSuccess = document.getElementById('trialSuccess');
  document.querySelectorAll('.open-trial-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (trialForm) trialForm.style.display = 'block';
      if (trialSuccess) trialSuccess.style.display = 'none';
      openModal('trialModal');
    });
  });

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      trialForm.style.display = 'none';
      trialSuccess.style.display = 'block';
    });
  }

  // Alumni Lightbox Detail
  const alumniDetails = [
    {
      name: 'Raka Pratama — Frontend Engineer di Tokopedia',
      batch: 'Bootcamp Full-Stack & AI • Batch 11',
      project: 'Platform E-Commerce Realtime Next.js + Payment Gateway',
      story:
        'Berawal dari fresh graduate teknik mesin, Raka mengikuti Bootcamp Intensif Sado Tech selama 16 minggu. Berkat 6 project portofolio dan sesi mock interview intensif, Raka diterima di Tokopedia dalam 3 minggu setelah lulus.',
    },
    {
      name: 'Nadia Putri — Product Designer di Traveloka',
      batch: 'Bootcamp UI/UX Product Design • Batch 12',
      project: 'Redesign Aplikasi Pemesanan Tiket & Design System Figma (140+ Komponen)',
      story:
        'Nadia lulus dengan predikat Cumlaude (98/100) dan membawa 4 studi kasus UX Research yang teruji langsung ke pengguna nyata. Portofolionya langsung menarik perhatian Lead Designer Traveloka.',
    },
    {
      name: 'Dimas Wijaya — Backend Engineer di Gojek',
      batch: 'Kelas Online Mandiri + Mentoring • 2025',
      project: 'Arsitektur Microservices Order Queue dengan Node.js & Redis',
      story:
        'Dimas memanfaatkan waktu malam sepulang kerja untuk menyelesaikan 120+ modul video HD Sado Tech dan aktif berdiskusi di Discord 24/7 hingga sukses berpindah karier menjadi Backend Engineer.',
    },
    {
      name: 'Siti Rahma — Data Analyst di Bank Mandiri',
      batch: 'Bootcamp Data Science & GenAI • Batch 12',
      project: 'Dashboard Prediksi Churn Nasabah & Otomasi Laporan SQL Python',
      story:
        'Melalui jaringan 120+ hiring partner Sado Tech, Siti mendapatkan rekomendasi langsung setelah Demo Day dan lolos seleksi Data Analyst hanya dalam 19 hari pasca kelulusan.',
    },
    {
      name: 'Kevin Halim — Full-Stack Developer (Remote Singapura)',
      batch: 'Bootcamp Full-Stack & AI • Batch 13',
      project: 'SaaS AI Customer Support & Analytics Dashboard',
      story:
        'Kevin menguasai TypeScript, PostgreSQL, dan integrasi AI API di Sado Tech. Latihan live coding interview dalam bahasa Inggris membantunya menembus perusahaan teknologi di Singapura.',
    },
  ];

  const alumniModalName = document.getElementById('alumniModalName');
  const alumniModalBody = document.getElementById('alumniModalBody');

  document.querySelectorAll('.proof-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-alumni') || '0', 10);
      const data = alumniDetails[idx];
      if (!data) return;
      alumniModalName.textContent = data.name;
      alumniModalBody.innerHTML = `
        <div style="margin-bottom:12px;">
          <span class="proof-badge">${data.batch}</span>
        </div>
        <div style="background:#f4f4f5; border:2px solid #000; border-radius:14px; padding:14px; margin-bottom:12px;">
          <div style="font-size:0.78rem; font-weight:800; color:#2563eb; margin-bottom:4px;">CAPSTONE PROJECT ALUMNI:</div>
          <div style="font-weight:800; font-size:0.94rem;">${data.project}</div>
        </div>
        <p style="font-size:0.92rem; color:#27272a; line-height:1.6;">${data.story}</p>
      `;
      openModal('alumniModal');
    });
  });

  // Dokumentasi Photo Lightbox
  document.querySelectorAll('.doc-card').forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-doc-src');
      const title = card.getAttribute('data-doc-title') || 'Dokumentasi Sado Tech';
      const caption = card.querySelector('.doc-caption span')?.textContent || '';
      alumniModalName.textContent = title;
      alumniModalBody.innerHTML = `
        <div style="border:2.5px solid #000; border-radius:16px; overflow:hidden; margin-bottom:12px; background:#09090b;">
          <img src="${src}" alt="${title}" style="width:100%; max-height:60vh; object-fit:contain;" />
        </div>
        <p style="font-size:0.9rem; color:#27272a; font-weight:600;">${caption}</p>
      `;
      openModal('alumniModal');
    });
  });

  // Mentor Advisor Modal
  const mentorAnswerBox = document.getElementById('mentorAnswerBox');
  const mentorSuggestions = {
    coding:
      '🚀 Rekomendasi: Mulai dari <strong>Bootcamp Intensif — Full-Stack Web & AI Engineering</strong>! Kamu akan dibimbing dari nol HTML/JS sampai mahir Next.js, Backend API, dan siap kerja dalam 16 minggu.',
    design:
      '🎨 Rekomendasi: Pilih <strong>UI/UX Product Design Mastery</strong>! Cocok untuk yang tidak harus banyak ngoding tapi ingin membangun produk digital yang estetik dan bernilai tinggi di perusahaan tech.',
    data:
      '🤖 Rekomendasi: Gabung <strong>Data Science & GenAI Python</strong>! Pelajari pengolahan data bisnis, SQL, hingga otomasi AI modern dengan studi kasus industri finansial & e-commerce.',
  };

  document.querySelectorAll('.open-mentor-modal').forEach((btn) => {
    btn.addEventListener('click', () => openModal('mentorModal'));
  });

  document.querySelectorAll('.mentor-ask').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-ans');
      if (mentorAnswerBox && mentorSuggestions[key]) {
        mentorAnswerBox.innerHTML = mentorSuggestions[key];
      }
    });
  });

  /* =========================================================================
     7. Bottom-Left Live Enrollment Toast
     ========================================================================= */
  const liveToast = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toastMessage');
  const toastTime = document.getElementById('toastTime');
  const closeToastBtn = document.getElementById('closeToastBtn');

  const toastFeed = [
    { msg: '<strong>A***</strong> baru saja mendaftar <strong>Bootcamp Intensif</strong>', time: 'Baru saja' },
    { msg: '<strong>N***</strong> bergabung <strong>Kelas UI/UX Mastery</strong>', time: '2 menit lalu' },
    { msg: '<strong>F***</strong> mengunduh <strong>Silabus Full-Stack AI</strong>', time: '4 menit lalu' },
    { msg: '<strong>R***</strong> mengambil <strong>Kelas Online Mandiri</strong>', time: '6 menit lalu' },
  ];

  let toastIdx = 0;
  let toastDismissed = false;

  if (closeToastBtn && liveToast) {
    closeToastBtn.addEventListener('click', () => {
      toastDismissed = true;
      liveToast.classList.add('hidden-toast');
    });

    setInterval(() => {
      if (toastDismissed) return;
      toastIdx = (toastIdx + 1) % toastFeed.length;
      liveToast.classList.add('hidden-toast');
      setTimeout(() => {
        if (toastDismissed) return;
        toastMessage.innerHTML = toastFeed[toastIdx].msg;
        toastTime.textContent = toastFeed[toastIdx].time;
        liveToast.classList.remove('hidden-toast');
      }, 350);
    }, 6500);
  }
});

