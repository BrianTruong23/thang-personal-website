
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



// PLAY SECTION 

const pairs = [
  ['React', 'JSX'],
  ['Git', 'Commit'],
  ['HTML', 'CSS'],
  ['Node', 'Express'],
  ['MongoDB', 'Mongoose'],
  ['Python', 'Flask'],
];

const tiles = pairs.flatMap(([tech, tool]) => [
  { name: tech, pair: tool },
  { name: tool, pair: tech }
]);

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
  const shuffled = shuffle([...tiles]);

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
          alert(`🎉 You won in ${moves} moves!`);
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



