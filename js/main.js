const themeToggle = document.querySelector(".theme-btn");
const body = document.body;
const langSelect = document.getElementById("lang-select");
const elements = document.querySelectorAll("[data-translate]");
let translations = {};
let currentLang = localStorage.getItem("lang") || "uz";
const modal = document.querySelector(".modal");
const appeal = document.querySelector(".appeal");
const modalClose = document.querySelector(".modal-close");

appeal.addEventListener("click", () => {
    modal.classList.toggle("modal-show");
});

modalClose.addEventListener("click", () => {
    modal.classList.remove("modal-show");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("modal-show");
    }
});
async function loadLanguage(lang) {
    try {
        const res = await fetch(`../assets/lang/${lang}.json`);
        translations = await res.json();
        currentLang = lang;
        updateTranslations();
    } catch (error) {
        console.error("Tilni yuklashda xatolik:", error);
    }
}

function updateTranslations() {
    elements.forEach((el) => {
        const key = el.getAttribute("data-translate");
        el.textContent = translations[key] || key;
    });

    const isDark = body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
}

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateTranslations();
});

langSelect.value = currentLang;
langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    loadLanguage(lang);
});

loadLanguage(currentLang);
