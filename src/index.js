import "./styles.css";
import createLayout from "./ui/layout.js";
import registrationFormContainer from "./ui/registration.js";
import loginFormContainer from "./ui/login.js";

const root = document.body;

function clearScreen() {
  root.innerHTML = "";
}

export function navigateTo(view) {
  clearScreen();
  root.appendChild(view());
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
