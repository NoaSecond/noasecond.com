const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    updateTheme();
});

function updateTheme() {
    if (document.body.classList.contains("dark-theme")) {
        document.documentElement.style.setProperty("--bg", "#121212");
        document.documentElement.style.setProperty("--text", "#ffffff");
        toggleBtn.textContent = "☀️ Thème clair";
    } else {
        document.documentElement.style.setProperty("--bg", "#ffffff");
        document.documentElement.style.setProperty("--text", "#000000");
        toggleBtn.textContent = "🌙 Thème sombre";
    }
}

// Charger le thème sauvegardé
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    updateTheme();
});
