import "./styles.css";
import createLayout from "./ui/layout.js";
import registrationFormContainer from "./ui/registration.js";
import loginFormContainer from "./ui/login.js";
import menu from "./ui/menu.js";

const root = document.body;

function clearScreen() {
  root.innerHTML = "";
}

export function navigateTo(view) {
  clearScreen();
  root.appendChild(view());
}

async function initializeApp() {
  try {
    const response = await fetch("https://canvaslab.onrender.com/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      navigateTo(menu);
      return;
    }
  } catch (error) {
    console.error(error);
  }

  renderAuthScreen();
}

let isSignup = false;

function toggleMode(loginForm, registrationForm, logo) {
  isSignup = !isSignup;

  if (isSignup) {
    // move logo
    logo.classList.remove("logo-left");
    logo.classList.add("logo-right");

    // show signup, hide login
    registrationForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  } else {
    // move logo back
    logo.classList.remove("logo-right");
    logo.classList.add("logo-left");

    // show login, hide signup

    loginForm.classList.add("hidden");
    registrationForm.classList.remove("hidden");
  }
}

function renderAuthScreen() {
  const { sectionRef, logo } = createLayout();

  const { registrationForm, loginBtn } = registrationFormContainer();
  const { loginForm, signupBtn } = loginFormContainer();

  loginForm.classList.add("hidden");

  sectionRef.appendChild(loginForm);
  sectionRef.appendChild(registrationForm);

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMode(loginForm, registrationForm, logo);
  });

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMode(loginForm, registrationForm, logo);
  });
}

initializeApp();
