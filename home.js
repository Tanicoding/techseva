document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("ns_theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("ns_theme", isDark ? "dark" : "light");
  });

  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good Morning" : hr < 18 ? "Good Afternoon" : "Good Evening";
  document.title = `${greet} — NutriShakti Dashboard`;

  // random nutrition tip
  const tips = [
    "Drink a glass of water before every meal.",
    "Add a fruit to your breakfast daily.",
    "Sleep at least 7 hours for better metabolism.",
    "Avoid late-night snacking.",
    "Eat colorful veggies for better nutrition."
  ];
  const tipEl = document.getElementById("nutri-tip");
  if (tipEl) tipEl.textContent = tips[Math.floor(Math.random() * tips.length)];

  // Toast
  function showToast(msg) {
    const t = document.getElementById("nsToast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1500);
  }

  // Daily streak logic
  const streakKey = "ns_streak";
  const lastKey = "ns_last_check";
  const btn = document.getElementById("daily-checkin-btn");
  const sNum = document.getElementById("streakNum");
  const today = new Date().toDateString();
  const last = localStorage.getItem(lastKey);
  let streak = parseInt(localStorage.getItem(streakKey) || "0");
  if (last === today && btn) {
    btn.textContent = "Checked ✅";
    btn.disabled = true;
  }
  const updateStreak = () => sNum && (sNum.textContent = streak);
  updateStreak();

  if (btn) {
    btn.addEventListener("click", () => {
      const prev = new Date(localStorage.getItem(lastKey) || "");
      const diff = (Date.now() - prev.getTime()) / (1000 * 3600 * 24);
      streak = diff < 2 ? streak + 1 : 1;
      localStorage.setItem(streakKey, streak);
      localStorage.setItem(lastKey, today);
      updateStreak();
      btn.textContent = "Checked ✅";
      btn.disabled = true;
      showToast("Checked in!");
    });
  }
});
