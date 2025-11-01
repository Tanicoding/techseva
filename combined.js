document.addEventListener("DOMContentLoaded", () => {
    // added 5 tips only for demo, can change
    const tips = [
        "Remember to start your day with a glass of water to kickstart your metabolism.",
        "Include a handful of nuts or seeds daily for essential healthy fats and fiber.",
        "Try to eat a variety of colorful fruits and vegetables to get a wide range of vitamins.",
        "Swap sugary drinks for fresh lemon water or unsweetened herbal tea.",
        "Chew your food slowly to aid digestion and help you feel fuller faster."
    ];

    const tipElement = document.getElementById("nutri-tip");

    if (tipElement) {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipElement.textContent = tips[randomIndex];
    }

    const checkinBtn = document.getElementById("daily-checkin-btn");
    if (checkinBtn) {
        checkinBtn.addEventListener('click', () => {
            alert("Daily Check-in Successful! Streak Maintained.");
            checkinBtn.textContent = "Checked In! ✅";
            checkinBtn.disabled = true;
            checkinBtn.style.backgroundColor = '#4CAF50'; 
        });
    }
});