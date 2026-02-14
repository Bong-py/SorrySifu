const fades = document.querySelectorAll('.fade-in');
const hiddenMessage = document.getElementById('hiddenMessage');
const forgiveBtn = document.getElementById('forgiveBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const heartsContainer = document.querySelector('.background-hearts');
const easterEgg = document.getElementById('easterEgg');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fades.forEach((el) => observer.observe(el));

forgiveBtn?.addEventListener('click', () => {
  hiddenMessage.classList.add('show');
  forgiveBtn.textContent = 'Thank you for hearing my heart.';
  forgiveBtn.disabled = true;
});

// Music starts muted by default; button un-mutes and plays when audio source exists.
musicToggle?.addEventListener('click', async () => {
  const hasSource = bgMusic?.querySelector('source')?.getAttribute('src');

  if (!hasSource) {
    musicToggle.textContent = 'Add music in assets/soft-instrumental.mp3';
    return;
  }

  try {
    if (bgMusic.paused) {
      bgMusic.muted = false;
      bgMusic.volume = 0.35;
      await bgMusic.play();
      musicToggle.textContent = 'Pause Soft Music';
      musicToggle.setAttribute('aria-pressed', 'true');
    } else {
      bgMusic.pause();
      musicToggle.textContent = 'Play Soft Music';
      musicToggle.setAttribute('aria-pressed', 'false');
    }
  } catch {
    musicToggle.textContent = 'Tap again to allow audio';
  }
});

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${8 + Math.random() * 10}s`;
  heart.style.animationDelay = `${Math.random() * 3}s`;
  heart.style.opacity = `${0.2 + Math.random() * 0.4}`;
  heartsContainer?.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 18000);
}

setInterval(createHeart, 1300);

let typed = '';
window.addEventListener('keydown', (event) => {
  typed = `${typed}${event.key.toLowerCase()}`.slice(-5);

  if (typed === 'sidfu') {
    easterEgg.textContent = 'Secret noted: Sidfu forever. 🤍';
    easterEgg.classList.add('show');
  }
});
