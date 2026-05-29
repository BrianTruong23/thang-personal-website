// ── Dynamic year ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("copyright-year");
  if (el) el.textContent = new Date().getFullYear();
});


// ── Dark / Light mode ─────────────────────────────────────────────────────
const htmlEl    = document.documentElement;
const themeBtn  = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeIcon) {
    themeIcon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
}

applyTheme(localStorage.getItem("theme") || "light");
themeBtn?.addEventListener("click", () => {
  applyTheme(htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark");
});


// ── Single-page nav ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const navLinks = document.querySelectorAll("nav ul li a.nav-link");

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = header?.offsetHeight || 64;
        const offset = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // Logo → top
  document.querySelector(".site-logo")?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active nav via IntersectionObserver
  const sections = document.querySelectorAll("#about, #work, #research, #play, #contact");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const a = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (a) a.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => io.observe(s));
});

// Hide scroll hint after scrolling
window.addEventListener("scroll", () => {
  const hint = document.querySelector(".scroll-hint");
  if (hint) hint.style.opacity = window.scrollY > 80 ? "0" : "1";
}, { passive: true });


// ── Hero polaroid parallax ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const hero     = document.querySelector(".hero-block");
  const pics     = document.querySelectorAll(".hero-polaroid");
  if (!hero || !pics.length) return;

  // Apply initial rotations
  pics.forEach(p => {
    const rot = parseFloat(p.dataset.rot || 0);
    p.style.transform = `rotate(${rot}deg) translateY(16px) scale(0.96)`;
  });

  hero.addEventListener("mouseenter", () => {
    pics.forEach(p => {
      const rot = parseFloat(p.dataset.rot || 0);
      p.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      p.style.transform = `rotate(${rot}deg) translate(0,0) scale(1)`;
    });
  });

  hero.addEventListener("mousemove", e => {
    const rect = hero.getBoundingClientRect();
    const mx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 … 0.5
    const my   = (e.clientY - rect.top)  / rect.height - 0.5;

    pics.forEach(p => {
      const rot   = parseFloat(p.dataset.rot   || 0);
      const speed = parseFloat(p.dataset.speed || 1);
      const tx    = mx * 40 * speed;
      const ty    = my * 26 * speed;
      p.style.transition = "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)";
      p.style.transform  = `rotate(${rot}deg) translate(${tx}px, ${ty}px) scale(1)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    pics.forEach(p => {
      const rot = parseFloat(p.dataset.rot || 0);
      p.style.transition = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
      p.style.transform  = `rotate(${rot}deg) translate(0,0) scale(0.98)`;
    });
  });
});


// ── Modals ─────────────────────────────────────────────────────────────────
function openModal(el)  { if (el) el.style.display = "flex"; }
function closeModal(el) { if (el) el.style.display = "none"; }

// Philosophy
const philosophyModal    = document.getElementById("philosophyModal");
const philosophyBtn      = document.getElementById("philosophy");
const philosophyClose    = document.getElementById("closeModal");
const philosophyBackdrop = document.getElementById("closePhilosophyBackdrop");

philosophyBtn?.addEventListener("click",      () => openModal(philosophyModal));
philosophyClose?.addEventListener("click",    () => closeModal(philosophyModal));
philosophyBackdrop?.addEventListener("click", () => closeModal(philosophyModal));

// Cinema
const cinemaModal    = document.getElementById("modal-cinema");
const cinemaClose    = document.getElementById("close-modal-cinema");
const cinemaBackdrop = document.getElementById("closeCinemaBackdrop");

document.getElementById("open-modal-cinema")?.addEventListener("click",  () => openModal(cinemaModal));
document.getElementById("open-modal-cinema-2")?.addEventListener("click", () => openModal(cinemaModal));
cinemaClose?.addEventListener("click",    () => closeModal(cinemaModal));
cinemaBackdrop?.addEventListener("click", () => closeModal(cinemaModal));

// Escape key
window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal(philosophyModal);
    closeModal(cinemaModal);
  }
});


// ── Showcase drag-to-scroll + arrow ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("showcase-track");
  if (!track) return;

  let isDown = false, startX = 0, scrollLeft = 0;

  track.addEventListener("mousedown", e => {
    isDown = true;
    track.classList.add("grabbing");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener("mouseleave", () => { isDown = false; track.classList.remove("grabbing"); });
  track.addEventListener("mouseup",    () => { isDown = false; track.classList.remove("grabbing"); });
  track.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });

});

// ── Typewriter ─────────────────────────────────────────────────────────────
const roles        = ["a Software Engineer.", "an AI fanatic.", "an AMC VIP member."];
const typewriterEl = document.getElementById("typewriter");
let roleIndex = 0, charIndex = 0, typing = true;

function typeEffect() {
  if (!typewriterEl) return;
  const current = roles[roleIndex];
  if (typing) {
    typewriterEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { typing = false; setTimeout(typeEffect, 1000); return; }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { typing = true; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeEffect, 100);
}
document.addEventListener("DOMContentLoaded", typeEffect);


// ── EmailJS ────────────────────────────────────────────────────────────────
emailjs.init("NRo7xETVlRoozDzE9");
document.getElementById("contact-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("service_vjlcl0a", "template_ttjx1yp", this)
    .then(() => { alert("Message sent!"); this.reset(); })
    .catch(err => { console.error(err); alert("Failed to send."); });
});


// ── Numbered explorer (Play section) ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns     = document.querySelectorAll(".num-tab-btn");
  const tabContents = document.querySelectorAll(".num-tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`.num-tab-content[data-tab="${tab}"]`)?.classList.add("active");
    });
  });
});


// ── Drawing board ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawing-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let isDrawing   = false;
  let lastX = 0, lastY = 0;
  let currentColor = "#111111";
  let currentSize  = 6;
  let isEraser     = false;

  // Responsive canvas: match CSS display size
  function resizeCanvas() {
    const data = canvas.toDataURL();          // save current drawing
    canvas.width  = canvas.offsetWidth  || 900;
    canvas.height = canvas.offsetHeight || 360;
    fillBg();
    // Restore drawing
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.src = data;
  }

  function fillBg() {
    const c = getComputedStyle(document.documentElement)
                .getPropertyValue("--surface").trim() || "#ffffff";
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  function getPos(e) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src    = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  }

  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    const p = getPos(e); lastX = p.x; lastY = p.y;
  }

  function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    if (isEraser) {
      const bg = getComputedStyle(document.documentElement)
                   .getPropertyValue("--surface").trim() || "#ffffff";
      ctx.strokeStyle = bg;
      ctx.lineWidth   = currentSize * 3;
    } else {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth   = currentSize;
    }
    ctx.lineCap    = "round";
    ctx.lineJoin   = "round";
    ctx.stroke();
    lastX = p.x; lastY = p.y;
  }

  function endDraw() { isDrawing = false; }

  canvas.addEventListener("mousedown",  startDraw);
  canvas.addEventListener("mousemove",  draw);
  canvas.addEventListener("mouseup",    endDraw);
  canvas.addEventListener("mouseleave", endDraw);
  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove",  draw,      { passive: false });
  canvas.addEventListener("touchend",   endDraw);

  // Color swatches
  document.querySelectorAll(".color-swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentColor = btn.dataset.color;
      isEraser     = false;
      document.getElementById("eraser-btn")?.classList.remove("active");
    });
  });

  // Brush size
  document.getElementById("brush-size")?.addEventListener("input", e => {
    currentSize = parseInt(e.target.value);
  });

  // Eraser
  document.getElementById("eraser-btn")?.addEventListener("click", () => {
    isEraser = !isEraser;
    document.getElementById("eraser-btn").classList.toggle("active", isEraser);
    if (isEraser) document.querySelectorAll(".color-swatch").forEach(b => b.classList.remove("active"));
  });

  // Clear
  document.getElementById("clear-canvas")?.addEventListener("click", () => {
    fillBg();
    // Remove active eraser if on
    isEraser = false;
    document.getElementById("eraser-btn")?.classList.remove("active");
  });
});
