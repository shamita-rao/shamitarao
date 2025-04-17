document.addEventListener("DOMContentLoaded", () => {
  // Update year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});