import { showError, clearError } from "../util/errorHelper.js";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../util/validation.js";
export default () => {
  const loginFormContainer = document.createElement("div");
  const loginHeading = document.createElement("h2");
  const loginForm = document.createElement("form");

  const emailInput = document.createElement("input");
  const passwordInput = document.createElement("input");

  const buttonContainer = document.createElement("div");
  const loginBtn = document.createElement("button");
  const signupBtn = document.createElement("button");

  loginHeading.textContent = "Login";

  emailInput.placeholder = "Email";
  passwordInput.placeholder = "Password";

  emailInput.type = "email";
  passwordInput.type = "password";

  emailInput.required = true;
  passwordInput.required = true;

  emailInput.minLength = 5;
  passwordInput.minLength = 8;

  passwordInput.min = 8;
  passwordInput.max = 15;

  emailInput.id = "email";
  passwordInput.id = "password";

  loginBtn.textContent = "Login";
  signupBtn.textContent = "Signup";

  loginBtn.type = "submit";

  loginFormContainer.id = "login-form-container";

  loginHeading.classList.add("form-heading");

  buttonContainer.classList.add("form-button-container");

  buttonContainer.appendChild(loginBtn);
  buttonContainer.appendChild(signupBtn);

  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(buttonContainer);

  loginBtn.classList.add("form-btn");
  signupBtn.classList.add("form-btn");

  loginFormContainer.appendChild(loginHeading);
  loginFormContainer.appendChild(loginForm);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    clearError(emailInput);
    clearError(passwordInput);

    if (!validateEmail(email)) {
      showError(emailInput, "Enter a valid email");
      valid = false;
    }

    if (!validatePassword(password)) {
      showError(passwordInput, "Password must be at least 8 characters");
      valid = false;
    }

    if (valid) {
      console.log("Login OK");
    }
  });

  return { loginForm: loginFormContainer, signupBtn };
};
