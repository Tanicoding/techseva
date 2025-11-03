document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const form = document.getElementById("onboard-form");
  const themeBtn = document.getElementById("theme-toggle");
  const get = (id) => document.getElementById(id);
  let currentStep = 1;

  /* === THEME TOGGLE === */
  const savedTheme = localStorage.getItem("ns_theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }

  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("ns_theme", isDark ? "dark" : "light");
  });

  /* === STEP HANDLING === */
  function showStep(step) {
    steps.forEach((s, i) => {
      const visible = i + 1 === step;
      s.style.display = visible ? "block" : "none";

      // disable hidden inputs to prevent focus bugs
      s.querySelectorAll("input, select, textarea, button").forEach((inp) => {
        inp.disabled = !visible;
      });

      // small entrance animation
      if (visible) {
        s.style.opacity = 0;
        s.style.transform = "translateY(12px)";
        setTimeout(() => {
          s.style.transition = "all 0.3s ease";
          s.style.opacity = 1;
          s.style.transform = "translateY(0)";
        }, 20);
      }
    });
    currentStep = step;
  }

  // navigation for all steps
  for (let i = 1; i <= 5; i++) {
    const next = get(`next${i}`);
    const back = get(`back${i}`);
    if (next) next.addEventListener("click", () => showStep(i + 1));
    if (back) back.addEventListener("click", () => showStep(i - 1));
  }

  /* === BUDGET SLIDER === */
  const budget = get("budget");
  if (budget) {
    budget.addEventListener("input", () => {
      get("budgetVal").textContent = budget.value;
    });
  }

  /* === SUMMARY (STEP 5 → 6) === */
  const next5 = get("next5");
  if (next5) {
    next5.addEventListener("click", () => {
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
  }

  /* === REDIRECT TO DASHBOARD === */
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = document.getElementById("goDashboard");
      if (btn) {
        btn.textContent = "Redirecting...";
        btn.disabled = true;
        btn.style.opacity = "0.7";
        btn.style.cursor = "wait";
      }

      setTimeout(() => {
        window.location.href = "home.html"; // ✅ redirects properly
      }, 1000);
    });
  }

  // initialize first step
  showStep(1);
});
