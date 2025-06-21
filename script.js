
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

  
  
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  const scrollButton = document.querySelector('.scroll-button');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.opacity = "0"; // Hide button after scrolling down
  } else {
    scrollButton.style.opacity = "1"; // Show button at the top
  }
}



const roles = ["a Software Engineer.", "an AI fanatic.", "an AMC A-list member."];
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