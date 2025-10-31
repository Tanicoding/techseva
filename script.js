const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("techsevaTheme", theme);
});

// Load saved theme
const savedTheme = localStorage.getItem("techsevaTheme");
if (savedTheme === "dark") {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
}
