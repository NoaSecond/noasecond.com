const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  return localStorageTheme || (systemSettingDark.matches ? "dark" : "light");
}

function updateButton({ buttonEl, isDark }) {
  const darkModeIconPath = 'assets/icons/dark-mode.svg';
  const lightModeIconPath = 'assets/icons/light-mode.svg';
  buttonEl.innerHTML = `<img src="${isDark ? lightModeIconPath : darkModeIconPath}" width="30" height="30">`;
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});