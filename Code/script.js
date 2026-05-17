/* ── Typed text animation ── */
const phrases = [
  'Full‑Stack Developer',
  'C# & ASP.NET Specialist',
  'Python Enthusiast',
  'Problem Solver',
  'IT Graduate'
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    setTimeout(type, 60);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 100);
  }
}
setTimeout(type, 600);

/* ── Dark mode toggle ── */
const html = document.documentElement;
const darkBtn = document.getElementById('darkToggle');
const darkIcon = darkBtn.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
  darkIcon.className = 'fas fa-sun';
}

darkBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  darkIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navRight = document.getElementById('navRight');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navRight.classList.toggle('open');
});

/* ── Tab / section navigation WITH SMOOTH SCROLL ── */
function showSection(target) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.nav-link[data-target="${target}"]`).forEach(l => l.classList.add('active'));
  
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById(target);
  if (section) {
    section.classList.add('active');
    setTimeout(checkFadeIns, 50);
    
    const headerOffset = 80;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  hamburger.classList.remove('open');
  navRight.classList.remove('open');
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('data-target');
    showSection(target);
  });
});

document.querySelectorAll('.btn-outline.nav-link').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('data-target');
    if (target) {
      showSection(target);
    }
  });
});

/* ── Fade‑in on scroll / visibility ── */
function checkFadeIns() {
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFadeIns);
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash && ['about', 'resume', 'projects', 'certificates', 'contact'].includes(hash)) {
    showSection(hash);
  } else {
    showSection('about');
  }
  setTimeout(checkFadeIns, 200);
});

/* ── Project modals ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    if (modalId) openModal(modalId);
  });
});

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(o => closeModal(o));
  }
});

/* ── Scroll-to-top button ── */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Update active nav link on scroll ── */
function updateActiveNavOnScroll() {
  const sections = ['about', 'resume', 'projects', 'certificates', 'contact'];
  const scrollPosition = window.scrollY + 100;
  
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        document.querySelectorAll(`.nav-link[data-target="${section}"]`).forEach(link => {
          link.classList.add('active');
        });
        break;
      }
    }
  }
}

window.addEventListener('scroll', updateActiveNavOnScroll);

/* ── CERTIFICATE DOWNLOAD FUNCTIONS - FIXED WITH YOUR EXACT FILE NAMES ── */

// Transcript download
function generateTranscript() {
  try {
    const link = document.createElement('a');
    link.href = 'Transcript.pdf';
    link.download = 'Transcript.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Transcript download started');
  } catch (error) {
    console.error('Error downloading transcript:', error);
    alert('Error downloading transcript. Please check if the file exists.');
  }
}

// Matric Certificate download
function generateMatricCert() {
  try {
    const link = document.createElement('a');
    link.href = 'Matric_Certificate.pdf';
    link.download = 'Matric_Certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Matric Certificate download started');
  } catch (error) {
    console.error('Error downloading matric certificate:', error);
    alert('Error downloading matric certificate. Please check if the file exists.');
  }
}

// Power BI Certificate download
function downloadPowerBICert() {
  try {
    const link = document.createElement('a');
    link.href = 'PowerBI_Certicate.png';
    link.download = 'PowerBI_Certicate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('PowerBI Certificate download started');
  } catch (error) {
    console.error('Error downloading PowerBI certificate:', error);
    alert('Error downloading PowerBI certificate. Please check if the file exists.');
  }
}

// View Power BI Certificate
function viewPowerBICert() {
  window.open('PowerBI_Certicate.png', '_blank');
}

// Mathlab Certificate download - using your exact file name
function downloadMathlabCert() {
  try {
    const link = document.createElement('a');
    link.href = 'mathlab_certificate.pdf';
    link.download = 'Kamogelo_Kau_Mathlab.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Mathlab Certificate download started');
  } catch (error) {
    console.error('Error downloading mathlab certificate:', error);
    alert('Error downloading mathlab certificate. Please check if the file exists.');
  }
}

// Simplilearn Certificate download - using your exact file name
function downloadSimplilearnCert() {
  try {
    const link = document.createElement('a');
    link.href = 'Simplilearn_Certificate.png';
    link.download = 'Kamogelo_Kau_Simplilearn.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Simplilearn Certificate download started');
  } catch (error) {
    console.error('Error downloading Simplilearn certificate:', error);
    alert('Error downloading Simplilearn certificate. Please check if the file exists.');
  }
}

// View Simplilearn Certificate
function viewSimplilearnCert() {
  window.open('Simplilearn_Certificate.png', '_blank');
}

// BSc Degree Certificate (if you want to add this)
function downloadBScCertificate() {
  try {
    const link = document.createElement('a');
    link.href = 'BSc_Degree_Certificate.pdf.pdf';
    link.download = 'Kamogelo_Kau_BSc_Degree.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('BSc Certificate download started');
  } catch (error) {
    console.error('Error downloading BSc certificate:', error);
    alert('Error downloading BSc certificate. Please check if the file exists.');
  }
}
