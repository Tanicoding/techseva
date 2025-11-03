/* ---------- NutriShakti Global (Header / Theme / Utils) ---------- */
(function(){
  const $ = (s) => document.querySelector(s);

  /* === THEME TOGGLE === */
  const themeBtn = $("#theme-toggle");
  if (themeBtn) {
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

    // keyboard accessibility
    themeBtn.addEventListener("keydown", (e)=> {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        themeBtn.click();
      }
    });
  }

  /* === SMALL TOAST (for reuse) === */
  window.NSToast = function(msg){
    const t = document.createElement("div");
    t.className = "ns-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=> t.classList.add("show"), 20);
    setTimeout(()=> {
      t.classList.remove("show");
      setTimeout(()=> t.remove(), 300);
    }, 1600);
  };

  /* === SMALL HELPER === */
  window.$ = $;
  window.$$ = (s)=> Array.from(document.querySelectorAll(s));
})();



// combined.js — shared utilities + theme handling
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");

  // === THEME TOGGLE ===
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // === Small Utility Toast ===
  window.showToast = function (msg) {
    let toast = document.createElement("div");
    toast.className = "ns-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 20);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 1800);
  };
});

