// ── Dynamic copyright year ─────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


// ── Dark / Light mode toggle ───────────────────────────────────────────────

const htmlEl    = document.documentElement;
const themeBtn  = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeIcon) {
    themeIcon.className = theme === "dark"
      ? "fa-solid fa-moon"
      : "fa-solid fa-sun";
  }
}

// Restore saved preference
applyTheme(localStorage.getItem("theme") || "light");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    applyTheme(htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}


// ── Section switching ──────────────────────────────────────────────────────

const allSections = document.querySelectorAll("section");

function showSection(id) {
  allSections.forEach(s => s.style.display = "none");
  const target = document.getElementById(id);
  if (target) {
    target.style.display = "flex";
    if (id === "experience-section") {
      const scroll = target.querySelector(".experience-scroll");
      if (scroll) scroll.scrollTop = 0;
    }
  }
}

showSection("home-section");

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
      const targetId = this.getAttribute("data-target");
      if (targetId) showSection(targetId);
    });
  });

  const logo = document.getElementById("home-logo");
  if (logo) {
    logo.addEventListener("click", e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      const homeLink = document.querySelector('[data-target="home-section"]');
      if (homeLink) homeLink.classList.add("active");
      showSection("home-section");
    });
  }
});


// ── Hero scroll hint ───────────────────────────────────────────────────────

let hasScrolled = false;
window.addEventListener("wheel", e => {
  if (!hasScrolled && e.deltaY > 0) {
    document.getElementById("section2")?.scrollIntoView({ behavior: "smooth" });
    hasScrolled = true;
  }
});

window.addEventListener("scroll", () => {
  const sb = document.querySelector(".scroll-button");
  if (!sb) return;
  sb.style.display = (document.documentElement.scrollTop > 20) ? "none" : "flex";
});


// ── Philosophy modal ───────────────────────────────────────────────────────

const philosophyModal    = document.getElementById("philosophyModal");
const philosophyBtn      = document.getElementById("philosophy");
const philosophyClose    = document.getElementById("closeModal");
const philosophyBackdrop = document.getElementById("closePhilosophyBackdrop");

function openModal(el)  { if (el) el.style.display = "flex"; }
function closeModal(el) { if (el) el.style.display = "none"; }

philosophyBtn?.addEventListener("click",      () => openModal(philosophyModal));
philosophyClose?.addEventListener("click",    () => closeModal(philosophyModal));
philosophyBackdrop?.addEventListener("click", () => closeModal(philosophyModal));


// ── Cinema modal ───────────────────────────────────────────────────────────

const cinemaModal    = document.getElementById("modal-cinema");
const cinemaOpen     = document.getElementById("open-modal-cinema");
const cinemaClose    = document.getElementById("close-modal-cinema");
const cinemaBackdrop = document.getElementById("closeCinemaBackdrop");

cinemaOpen?.addEventListener("click",     () => openModal(cinemaModal));
cinemaClose?.addEventListener("click",    () => closeModal(cinemaModal));
cinemaBackdrop?.addEventListener("click", () => closeModal(cinemaModal));

// Escape key closes any open modal
window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal(philosophyModal);
    closeModal(cinemaModal);
  }
});


// ── Typewriter ─────────────────────────────────────────────────────────────

const roles        = ["a Software Engineer.", "an AI fanatic.", "an AMC VIP member."];
const typewriterEl = document.getElementById("typewriter");

let roleIndex = 0, charIndex = 0, typing = true;

function typeEffect() {
  const current = roles[roleIndex];
  if (typing) {
    typewriterEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      typing = false;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, 100);
}

document.addEventListener("DOMContentLoaded", typeEffect);


// ── EmailJS contact form ───────────────────────────────────────────────────

emailjs.init("NRo7xETVlRoozDzE9");

document.getElementById("contact-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const form = this;
  emailjs.sendForm("service_vjlcl0a", "template_ttjx1yp", this)
    .then(() => { alert("Message sent successfully!"); form.reset(); })
    .catch(err => { console.error("FAILED...", err); alert("Failed to send message."); });
});


// ── Experience scroll indicator ────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const expItems        = document.querySelectorAll(".experience");
  const indicator       = document.querySelector(".experience-scroll-indicator");
  const scrollContainer = document.querySelector(".experience-scroll");
  if (!indicator || !scrollContainer) return;

  indicator.innerHTML = "";
  expItems.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      expItems[i].scrollIntoView({ behavior: "smooth" });
      updateDot(i);
    });
    indicator.appendChild(dot);
  });

  function updateDot(active) {
    indicator.querySelectorAll(".dot").forEach((d, i) =>
      d.classList.toggle("active", i === active)
    );
  }

  scrollContainer.addEventListener("scroll", () => {
    const idx = Math.round(scrollContainer.scrollTop / scrollContainer.clientHeight);
    updateDot(idx);
  });
});


// ── Play section ───────────────────────────────────────────────────────────

const wordleSection = document.getElementById("wordle-section");
const tileSection   = document.getElementById("tile-section");
const tileGame      = document.getElementById("tile-game");
const welcomeText   = document.querySelector(".welcome-text");

wordleSection.style.display  = "none";
tileSection.style.display    = "none";
if (tileGame) tileGame.style.display = "none";

let welcomeHidden = false;

function revealGame(show, hide) {
  if (hide) hide.style.display = "none";
  show.style.display = "block";
}

function hideWelcomeAndShow(game) {
  if (!welcomeHidden) {
    welcomeText.classList.add("slide-up");
    welcomeText.addEventListener("transitionend", function handler() {
      welcomeText.style.display = "none";
      welcomeHidden = true;
      revealGame(game, null);
      welcomeText.removeEventListener("transitionend", handler);
    }, { once: true });
  } else {
    const other = game === wordleSection ? tileSection : wordleSection;
    revealGame(game, other);
  }
}

function setActiveGameBtn(category) {
  document.querySelectorAll(".game-type-button").forEach(b =>
    b.classList.toggle("active-game", b.getAttribute("data-category") === category)
  );
}

document.getElementById("tile")?.addEventListener("click", () => {
  setActiveGameBtn("tile");
  document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("category-btn-active"));
  hideWelcomeAndShow(tileSection);
  wordleSection.style.display = "none";
});

document.getElementById("wordle")?.addEventListener("click", () => {
  setActiveGameBtn("wordle");
  document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("category-btn-active"));
  hideWelcomeAndShow(wordleSection);
  tileSection.style.display = "none";
});


// ── Tile game ──────────────────────────────────────────────────────────────

const pairs_tech = [
  ["React","JSX"], ["Git","Commit"], ["HTML","CSS"],
  ["Node","Express"], ["MongoDB","Mongoose"], ["Python","Flask"],
];

const pairs_marvel = [
  ["Iron Man","Robert Downey Jr."], ["Kingpin","Vincent D’Onofrio"],
  ["Vision","Paul Bettany"], ["Wanda","Elizabeth Olsen"],
  ["Moon Knight","Oscar Isaac"], ["Miles Morales","Shameik Moore"],
];

let pairs = pairs_tech;
const TECH = 0, MARVEL = 1;
let categoryChosen = TECH;
let flippedTiles = [], matchedPairs = 0, moves = 0;
let bestMoves = sessionStorage.getItem("bestMoves");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTiles() {
  return pairs.flatMap(([a, b]) => [{ name: a, pair: b }, { name: b, pair: a }]);
}

function updateScore() {
  document.getElementById("moves").innerText = moves;
  document.getElementById("best-moves").innerText = bestMoves || "--";
}

function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  shuffle(getTiles()).forEach(data => {
    const tile  = document.createElement("div");
    tile.classList.add("flip-tile");
    tile.dataset.name = data.name;
    tile.dataset.pair = data.pair;
    const label = document.createElement("div");
    label.classList.add("content");
    label.innerText = data.name;
    tile.appendChild(label);
    tile.addEventListener("click", () => handleTile(tile));
    board.appendChild(tile);
  });
}

function resetGame() {
  flippedTiles = []; matchedPairs = 0; moves = 0;
  updateScore(); createBoard();
}

function handleTile(tile) {
  if (tile.classList.contains("flipped") || tile.classList.contains("matched") || flippedTiles.length >= 2) return;
  tile.classList.add("flipped");
  flippedTiles.push(tile);
  if (flippedTiles.length === 2) {
    moves++;
    updateScore();
    const [a, b] = flippedTiles;
    if (a.dataset.name === b.dataset.pair) {
      a.classList.add("matched"); b.classList.add("matched");
      matchedPairs++;
      flippedTiles = [];
      if (matchedPairs === pairs.length) {
        if (!bestMoves || moves < Number(bestMoves)) {
          bestMoves = moves;
          sessionStorage.setItem("bestMoves", bestMoves);
        }
        setTimeout(() => {
          alert(categoryChosen === TECH
            ? `🎉 You won in ${moves} moves! These technologies are all in Brian's toolbox.`
            : `🎉 You won in ${moves} moves!`
          );
          updateScore();
        }, 300);
      }
    } else {
      setTimeout(() => {
        a.classList.remove("flipped"); b.classList.remove("flipped");
        flippedTiles = [];
      }, 900);
    }
  }
}

function handleCategory(e) {
  const cat = e.target.getAttribute("data-category");
  if (cat === "tech") {
    pairs = pairs_tech; categoryChosen = TECH;
    document.getElementById("game-title").textContent = "🧠 Tech Memory Match";
    document.getElementById("game-info").textContent =
      "Flip two tiles to find matching tech pairs like React ⇔ JSX or Git ⇔ Commit. Match all in the fewest moves!";
  } else {
    pairs = pairs_marvel; categoryChosen = MARVEL;
    document.getElementById("game-title").textContent = "🦸 Marvel Memory Match";
    document.getElementById("game-info").textContent =
      "Match Marvel characters with the actors who played them. Can you find them all?";
  }
  document.querySelectorAll(".category-btn").forEach(b =>
    b.classList.toggle("category-btn-active", b.getAttribute("data-category") === cat)
  );
  if (tileGame) tileGame.style.display = "block";
  resetGame();
}

document.getElementById("restart-button")?.addEventListener("click", resetGame);
document.addEventListener("DOMContentLoaded", () => { createBoard(); updateScore(); });

if (bestMoves) document.getElementById("best-moves").innerText = bestMoves;


// ── Wordle ─────────────────────────────────────────────────────────────────

const wordList = [
  "About","Alert","Argue","Beach","Above","Alike","Arise","Began",
  "Abuse","Alive","Array","Begin","Actor","Allow","Aside","Begun",
  "Acute","Alone","Asset","Being","Admit","Along","Audio","Below",
  "Adopt","Alter","Audit","Bench","Adult","Among","Avoid","Billy",
  "After","Anger","Award","Birth","Again","Angle","Aware","Black",
  "Agent","Angry","Badly","Blame","Agree","Apart","Baker","Blind",
  "Ahead","Apple","Bases","Block","Alarm","Apply","Basic","Blood",
  "Album","Arena","Basis","Board","Boost","Buyer","China","Cover",
  "Booth","Cable","Chose","Craft","Bound","Calif","Civil","Crash",
  "Brain","Carry","Claim","Cream","Brand","Catch","Class","Crime",
  "Bread","Cause","Clean","Cross","Break","Chain","Clear","Crowd",
  "Breed","Chair","Click","Crown","Brief","Chart","Clock","Curve",
  "Bring","Chase","Close","Coach","Broad","Cheap","Build","Cycle",
];

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

var WORDLE_WORD = getRandomWord();
let wordleGuesses = [];
const submitBtn = document.getElementById("submit-btn-wordle");

function submitWordleGuess() {
  const input   = document.getElementById("wordle-input");
  const message = document.getElementById("wordle-message");
  const board   = document.getElementById("wordle-board");
  const guess   = input.value.trim().toUpperCase();

  if (guess.length !== 5)     { message.textContent = "Guess must be 5 letters!"; return; }
  if (wordleGuesses.length >= 6) { message.textContent = "No more guesses! The word was " + WORDLE_WORD; return; }

  const freq = {};
  for (let i = 0; i < 5; i++) {
    freq[WORDLE_WORD[i]] = (freq[WORDLE_WORD[i]] || 0) + 1;
    if (guess[i] === WORDLE_WORD[i]) freq[WORDLE_WORD[i]]--;
  }

  const row = document.createElement("div");
  row.className = "wordle-row";
  for (let i = 0; i < 5; i++) {
    const cell = document.createElement("div");
    cell.className = "wordle-cell";
    cell.textContent = guess[i];
    if (guess[i] === WORDLE_WORD[i]) {
      cell.classList.add("correct");
    } else if (WORDLE_WORD.includes(guess[i]) && (freq[guess[i]] || 0) > 0) {
      cell.classList.add("present");
      freq[guess[i]]--;
    } else {
      cell.classList.add("absent");
    }
    row.appendChild(cell);
  }
  board.appendChild(row);
  wordleGuesses.push(guess);
  input.value = "";
  message.textContent = "";

  if (guess === WORDLE_WORD) {
    message.textContent = "🎉 You guessed it!";
    submitBtn.disabled = true;
    submitBtn.classList.add("disable-btn-wordle");
    input.disabled = true;
  } else if (wordleGuesses.length === 6) {
    message.textContent = "💀 Game over! The word was " + WORDLE_WORD;
    input.disabled = true;
  }
}

function resetWordle() {
  wordleGuesses = [];
  WORDLE_WORD = getRandomWord();
  document.getElementById("wordle-board").innerHTML = "";
  document.getElementById("wordle-message").textContent = "";
  const inp = document.getElementById("wordle-input");
  inp.disabled = false; inp.value = "";
  submitBtn.disabled = false;
  submitBtn.classList.remove("disable-btn-wordle");
}
