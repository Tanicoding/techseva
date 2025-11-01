document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const form = document.getElementById("onboard-form");
  let currentStep = 1;

  const get = (id) => document.getElementById(id);

  // Show only one step at a time & disable hidden fields
  const showStep = (step) => {
    steps.forEach((s, i) => {
      const isVisible = i + 1 === step;
      s.style.display = isVisible ? "block" : "none";

      // Disable inputs in hidden steps to fix "not focusable" bug
      const inputs = s.querySelectorAll("input, select, textarea, button");
      inputs.forEach((inp) => (inp.disabled = !isVisible));
    });
    currentStep = step;
  };

  // Navigation
  get("next1").onclick = () => showStep(2);
  get("back1").onclick = () => showStep(1);
  get("next2").onclick = () => showStep(3);
  get("back2").onclick = () => showStep(2);
  get("next3").onclick = () => showStep(4);
  get("back3").onclick = () => showStep(3);
  get("next4").onclick = () => showStep(5);
  get("back4").onclick = () => showStep(4);

  // Budget live update
  const budget = get("budget");
  if (budget) {
    budget.addEventListener("input", () => {
      get("budgetVal").textContent = budget.value;
    });
  }

  // Step 5 → Step 6 Summary
  get("next5").addEventListener("click", () => {
    const goal = get("goal").value || "Not selected";
    const budgetVal = get("budget").value || "N/A";
    const prefs = [];
    if (get("veg").checked) prefs.push("Vegetarian");
    if (get("nonveg").checked) prefs.push("Non-Vegetarian");
    if (get("allergies").checked) prefs.push("Allergic to Dairy");

    get("summary").innerHTML = `
      <b>Goal:</b> ${goal}<br>
      <b>Budget:</b> ₹${budgetVal}<br>
      <b>Preferences:</b> ${prefs.join(", ") || "None"}
    `;

    showStep(6);
  });

  // Submit → redirect
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("goDashboard");
    if (btn) btn.textContent = "Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  });

  // Initialize first step
  showStep(1);
});




