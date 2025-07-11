
// // Hide all sections
const sections = document.querySelectorAll("section");

sections.forEach(section => {
  section.style.display = "none";
});

// Show only one section (e.g., 'home')
document.getElementById("home-section").style.display = "flex";


// hide sections at clicks 
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section"); // assumes all sections are in <section> tags
  
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
  
        // Remove 'active' from all links
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
  
        // Convert link text to lowercase and construct target ID
        const targetId = this.textContent.toLowerCase() + "-section";

        console.log(targetId)

        // Hide all sections
        sections.forEach(section => {
            // console.log(section.textContent.toLowerCase() + "-section");
            section.style.display = "none";
        });
  
        // Show the matched section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = "flex";
        }
      });
    });
  });



let hasScrolled = false;

window.addEventListener("wheel", function (e) {
  if (!hasScrolled && e.deltaY > 0) {
    document.getElementById("section2").scrollIntoView({ behavior: "smooth" });
    hasScrolled = true;
  }
});

  

  const modal = document.getElementById("philosophyModal");
  const btn = document.getElementById("philosophy");
  const close = document.getElementById("closeModal");

  btn.onclick = function() {
    modal.style.display = "flex";
  }

  close.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  const scrollButton = document.querySelector('.scroll-button');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "none"; // Hide button after scrolling down
  } else {
    scrollButton.style.display = "block"; // Show button at the top
  }
}


const openCinemaModal = document.getElementById("open-modal-cinema");
const closeCinemaModal = document.getElementById("close-modal-cinema");
const cinemaModal = document.getElementById("modal-cinema");

openCinemaModal.onclick = () => cinemaModal.style.display = "block";
closeCinemaModal.onclick = () => cinemaModal.style.display = "none";

window.onclick = (e) => {
  if (e.target == cinemaModal) cinemaModal.style.display = "none";
};


const roles = ["a Software Engineer.", "an AI fanatic.", "an AMC VIP member."];
const color = ['red', 'blue', 'black']
const typewriterSpan = document.getElementById("typewriter");

let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  const currentRole = roles[roleIndex];


  typewriterSpan.style.fontWeight = "bold";
  typewriterSpan.style.color = color[roleIndex];

  if (typing) {
    typewriterSpan.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      typing = false;
      setTimeout(typeEffect, 1000); // pause before deleting
      return;
    }
  } else {
    typewriterSpan.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, 100);
}

// Start typing on load
document.addEventListener("DOMContentLoaded", typeEffect);

// Initialize EmailJS
emailjs.init("NRo7xETVlRoozDzE9");

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = this;

  emailjs.sendForm('service_vjlcl0a', 'template_ttjx1yp', this)
    .then(() => {
      alert("Message sent successfully!");
      form.reset(); 
    }, (error) => {
      console.error("FAILED...", error);
      alert("Failed to send message.");
    });
});


// Experience Section 


document.addEventListener('DOMContentLoaded', () => {
  const experienceSections = document.querySelectorAll('.experience');
  const indicatorContainer = document.querySelector('.experience-scroll-indicator');
  const scrollContainer = document.querySelector('.experience-scroll');

  // Clear any existing dots (in case you're hot-reloading or updating)
  indicatorContainer.innerHTML = '';

  experienceSections.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    
    dot.addEventListener('click', () => {
      experienceSections[index].scrollIntoView({ behavior: 'smooth' });
      updateActiveDot(index);
    });

    indicatorContainer.appendChild(dot);
  });

  function updateActiveDot(activeIndex) {
    const dots = document.querySelectorAll('.experience-scroll-indicator .dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  // Optional: update active dot on scroll
  scrollContainer.addEventListener('scroll', () => {
    const index = Math.round(scrollContainer.scrollTop / window.innerHeight);
    updateActiveDot(index);
  });
});


const WORDLE = "wordle"
const TILE = "tile"
const tile_game = document.getElementById("tile-game");
const wordle_game = document.getElementById("wordle-section");
const NONE = "none"

function make_it_disappear(name_section){
  const section = document.getElementById(name_section);
  if (section) section.style.display = NONE;
}

wordle_game.style.display = NONE;

make_it_disappear("tile-game");

// PLAY SECTION 
const tile_section = document.getElementById("tile-section");
if (tile_section) tile_section.style.display = NONE;

document.getElementById(WORDLE)?.addEventListener("click", () => {
    if (tile_section) tile_section.style.display = NONE;
    add_active_class_remove_other_active_class("game-type-button", WORDLE, "active-game");
    add_active_class_remove_other_active_class("category-btn", NONE, "category-btn-active")
    make_it_disappear("tile-game");
    wordle_game.style.display = "block";
});

document.getElementById(TILE)?.addEventListener("click", () => {
    if (tile_section) tile_section.style.display = "block";
    add_active_class_remove_other_active_class("game-type-button", TILE, "active-game");

    wordle_game.style.display = "none";
});



const pairs_tech = [
  ['React', 'JSX'],
  ['Git', 'Commit'],
  ['HTML', 'CSS'],
  ['Node', 'Express'],
  ['MongoDB', 'Mongoose'],
  ['Python', 'Flask'],
];

const pairs_marvel = [
  ['Iron Man', 'Robert Downey Jr.'],
  ['Kingpin', 'Vincent D’Onofrio'],
  ['Vision', 'Paul Bettany'],
  ['Wanda', 'Elizabeth Olsen'],
  ['Moon Knight', 'Oscar Isaac'],
  ['Miles Morales', 'Shameik Moore'],
];

let pairs = pairs_tech; // default

const TECH_CATEGORY = 0;
const MARVEL_CATEGORY = 1;

var categoryChosen = TECH_CATEGORY;

function add_active_class_remove_other_active_class(element_class, category, active_class_name) {
  // PASS IN NONE IN CATEGORY MAKE EVERY ACTIVE CLASS GO AWAY 
  const selector = element_class.includes(".") ? element_class : "." + element_class;
  const categories = document.querySelectorAll(selector);
  if (category == NONE){
    categories.forEach((el) => {
      el.classList.remove(active_class_name);
    })
  }else{
    categories.forEach((el) => {
      const isMatch = el.getAttribute("data-category") === category;

      if (!isMatch && el.classList.contains(active_class_name)) {
        el.classList.remove(active_class_name);
      } else if (isMatch && !el.classList.contains(active_class_name)) {
        el.classList.add(active_class_name);
      }
    });
  }

}

const welcomeSection = document.querySelector('.welcome-play-section');
const welcomeText = document.querySelector('.welcome-text');
const wordleSection = document.getElementById('wordle-section');
const tileSection = document.getElementById('tile-section');

// Initial hiding of game sections
tileSection.style.display = 'none';
wordleSection.style.display = 'none';

let welcomeTextHidden = false;

function showGameSection(sectionToShow, sectionToHide) {
  if (sectionToHide) {
    sectionToHide.classList.remove('visible');
    sectionToHide.style.display = 'none';
  }

  sectionToShow.style.display = 'block';

  requestAnimationFrame(() => {
    sectionToShow.classList.add('visible');
  });
}

document.getElementById('tile').addEventListener('click', () => {
  if (!welcomeTextHidden) {
    welcomeText.classList.add('slide-up');
    welcomeText.addEventListener('transitionend', function handler() {
      welcomeText.style.display = 'none';
      welcomeTextHidden = true;

      showGameSection(tileSection, null);

      welcomeText.removeEventListener('transitionend', handler);
    }, { once: true });
  } else {
    showGameSection(tileSection, wordleSection);
  }
});

document.getElementById('wordle').addEventListener('click', () => {
  if (!welcomeTextHidden) {
    welcomeText.classList.add('slide-up');
    welcomeText.addEventListener('transitionend', function handler() {
      welcomeText.style.display = 'none';
      welcomeTextHidden = true;

      showGameSection(wordleSection, null);

      welcomeText.removeEventListener('transitionend', handler);
    }, { once: true });
  } else {
    showGameSection(wordleSection, tileSection);
  }
});







function handleCategory(event) {
  const category = event.target.getAttribute('data-category');
  if (category === 'tech') {
    pairs = pairs_tech;
    document.getElementById('game-title').textContent = '🧠 Tech Memory Match';
    document.getElementById('game-info').textContent =
      'Flip two tiles at a time to find matching tech pairs like React ⇔ JSX or Git ⇔ Commit. Match all pairs in the fewest moves possible!';
    categoryChosen = TECH_CATEGORY;
    add_active_class_remove_other_active_class("category-btn", category, "category-btn-active");
  } else if (category === 'marvel') {
    pairs = pairs_marvel;
    document.getElementById('game-title').textContent = '🦸 Marvel Memory Match';
    document.getElementById('game-info').textContent =
      'Flip two tiles at a time to match Marvel characters with the person who played them like Iron Man ⇔ Robert Downey Jr. or Wanda ⇔ Elizabeth Olsen. Can you find them all?';
      categoryChosen = MARVEL_CATEGORY;
   add_active_class_remove_other_active_class("category-btn", category, "category-btn-active");
  }


  tile_game.style.display = "block";

  resetGame();
}

function getTiles() {
  return pairs.flatMap(([item1, item2]) => [
    { name: item1, pair: item2 },
    { name: item2, pair: item1 }
  ]);
}

let flippedTiles = [];
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  const shuffled = shuffle(getTiles());

  shuffled.forEach((tileData, index) => {
    const tile = document.createElement('div');
    tile.classList.add('flip-tile');
    tile.dataset.name = tileData.name;
    tile.dataset.pair = tileData.pair;

    const content = document.createElement('div');
    content.classList.add('content');
    content.innerText = tileData.name;

    tile.appendChild(content);
    tile.addEventListener('click', () => handleTileClick(tile));
    board.appendChild(tile);
  });
}

// Load best score from sessionStorage if exists
let bestMoves = sessionStorage.getItem("bestMoves");
if (bestMoves) {
  document.getElementById("best-moves").innerText = bestMoves;
}

function updateScoreDisplay() {
  document.getElementById("moves").innerText = moves;
  document.getElementById("best-moves").innerText = bestMoves || "--";
}

function resetGame() {
  flippedTiles = [];
  matchedPairs = 0;
  moves = 0;
  updateScoreDisplay();
  createBoard();
}

function handleTileClick(tile) {
  if (tile.classList.contains("flipped") || tile.classList.contains("matched") || flippedTiles.length >= 2)
    return;

  tile.classList.add("flipped");
  flippedTiles.push(tile);

  if (flippedTiles.length === 2) {
    moves++;
    updateScoreDisplay();

    const [tile1, tile2] = flippedTiles;
    if (tile1.dataset.name === tile2.dataset.pair) {
      tile1.classList.add("matched");
      tile2.classList.add("matched");
      matchedPairs++;
      flippedTiles = [];

      if (matchedPairs === pairs.length) {
        // Check and update best score
        if (!bestMoves || moves < bestMoves) {
          bestMoves = moves;
          sessionStorage.setItem("bestMoves", bestMoves);
        }
        setTimeout(() => {
          if (categoryChosen == TECH_CATEGORY){
             alert(`🎉 You won in ${moves} moves! Fun Fact: These technologies are all in Thang's tool box.`);
          }else{
             alert(`🎉 You won in ${moves} moves!`);
          }
         
          updateScoreDisplay();
        }, 300);
      }
    } else {
      setTimeout(() => {
        tile1.classList.remove("flipped");
        tile2.classList.remove("flipped");
        flippedTiles = [];
      }, 1000);
    }
  }
}

document.getElementById("restart-button").addEventListener("click", resetGame);
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  updateScoreDisplay();
});



