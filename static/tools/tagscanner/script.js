// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav--open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after tapping a link
document.getElementById('navLinks').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Screenshot lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}

document.querySelectorAll('.shot img').forEach((img) => {
  img.addEventListener('click', () => openLightbox(img));
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(img);
    }
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
