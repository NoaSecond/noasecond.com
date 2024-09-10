// Determines the theme to use based on user preference or system setting.
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
  
// Updates the button's icon and aria-label based on the theme (dark or light).
function updateButton({ buttonEl, isDark }) {
    const darkModeIconPath = 'assets/icons/dark-mode.svg';
    const lightModeIconPath = 'assets/icons/light-mode.svg';

    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    buttonEl.setAttribute("aria-label", newCta); //Accessibility
    buttonEl.innerHTML = `<img src="${isDark ? lightModeIconPath : darkModeIconPath}" width="30" height="30">`;
}
  
// Updates the theme setting on the html tag
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}
  

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });
  

button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
}); 