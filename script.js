// THEME TOGGLE (optional)
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("techsevaTheme", theme);
  });
}

const savedTheme = localStorage.getItem("techsevaTheme");
if (savedTheme === "dark") {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
}

// MULTI-STEP LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 1;

  function showStep(step) {
    steps.forEach((s, i) => s.style.display = (i + 1 === step) ? "block" : "none");
    currentStep = step;
  }

  // Navigation (fixed)
  document.getElementById("next1").onclick = () => showStep(2);
  document.getElementById("back1").onclick = () => showStep(1);
  document.getElementById("next2").onclick = () => showStep(3);
  document.getElementById("back2").onclick = () => showStep(2);
  document.getElementById("next3").onclick = () => showStep(4);
  document.getElementById("back3").onclick = () => showStep(3);
  document.getElementById("next4").onclick = () => showStep(5); // ✅ this was wrong before
  document.getElementById("back4").onclick = () => showStep(4);
  document.getElementById("next5").onclick = () => showStep(6);

  // Live budget update
  const budget = document.getElementById("budget");
  budget.addEventListener("input", () => {
    document.getElementById("budgetVal").textContent = budget.value;
  });

  // Summary before dashboard
  document.getElementById("next5").addEventListener("click", () => {
    const goal = document.getElementById("goal").value;
    const budgetVal = document.getElementById("budget").value;
    const prefs = [];
    if (document.getElementById("veg").checked) prefs.push("Vegetarian");
    if (document.getElementById("nonveg").checked) prefs.push("Non-Vegetarian");
    if (document.getElementById("allergies").checked) prefs.push("Allergic to Dairy");

    document.getElementById("summary").innerHTML = `
      <b>Goal:</b> ${goal}<br>
      <b>Budget:</b> ₹${budgetVal}<br>
      <b>Preferences:</b> ${prefs.join(", ") || "None"}
    `;
  });

  // Prevent reload and redirect
  document.getElementById("onboard-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Redirecting to your personalized dashboard...");
    window.location.href = "dashboard.html";
  });
});



  document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stops page reload
    // you can validate or save data here
    window.location.href = "dashboard.html"; // redirect
  });

 
  document.getElementById("finishBtn").addEventListener("click", () => {
    // show loader or success message
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500); // redirect after 1.5 seconds
  });



