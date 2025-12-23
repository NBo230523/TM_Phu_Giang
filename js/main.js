document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("status").classList.remove("hidden");
  this.reset();
});
