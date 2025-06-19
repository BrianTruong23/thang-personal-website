const toggle = document.getElementById("viewToggle");
const slider = document.getElementById("slider");
const options = toggle.querySelectorAll(".toggle-option");

options.forEach((option, index) => {
  option.addEventListener("click", () => {
    slider.style.transform = `translateX(${index * 100}%)`;

    options.forEach(o => o.classList.remove("active"));
    option.classList.add("active");

    // You can optionally do something with the selected view:
    console.log("Selected view:", option.dataset.view);
  });
});
