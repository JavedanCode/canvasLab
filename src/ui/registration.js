import { showError, clearError } from "../util/errorHelper.js";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../util/validation.js";
export default () => {
  const registrationFormContainer = document.createElement("div");
  const registrationHeading = document.createElement("h2");
  const registrationForm = document.createElement("form");

  const usernameInput = document.createElement("input");
  const emailInput = document.createElement("input");
  const passwordInput = document.createElement("input");

  const buttonContainer = document.createElement("div");
  const loginBtn = document.createElement("button");
  const signupBtn = document.createElement("button");

  registrationHeading.textContent = "Signup";

  usernameInput.placeholder = "Username";
  emailInput.placeholder = "Email";
  passwordInput.placeholder = "Password";

  usernameInput.type = "text";
  emailInput.type = "email";
  passwordInput.type = "password";

  usernameInput.max = 50;
  usernameInput.min = 8;

  passwordInput.min = 8;
  passwordInput.max = 15;

  usernameInput.required = true;
  usernameInput.minLength = 3;
  usernameInput.maxLength = 50;

  usernameInput.id = "username";
  emailInput.id = "email";
  passwordInput.id = "password";

  loginBtn.textContent = "Login";
  signupBtn.textContent = "Signup";

  loginBtn.type = "submit";

  registrationFormContainer.id = "reg-form-container";

  registrationHeading.classList.add("form-heading");

  buttonContainer.classList.add("form-button-container");

  loginBtn.classList.add("form-btn");
  signupBtn.classList.add("form-btn");

  buttonContainer.appendChild(loginBtn);
  buttonContainer.appendChild(signupBtn);

  registrationForm.appendChild(usernameInput);
  registrationForm.appendChild(emailInput);
  registrationForm.appendChild(passwordInput);
  registrationForm.appendChild(buttonContainer);

  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    clearError(usernameInput);
    clearError(emailInput);
    clearError(passwordInput);

    if (!validateUsername(username)) {
      showError(usernameInput, "Username too short");
      valid = false;
    }

    if (!validateEmail(email)) {
      showError(emailInput, "Invalid email");
      valid = false;
    }

    if (!validatePassword(password)) {
      showError(passwordInput, "Min 8 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }
      alert("Signup successful! You can now log in.");
      loginBtn.click();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  });

  registrationFormContainer.appendChild(registrationHeading);
  registrationFormContainer.appendChild(registrationForm);

  return { registrationForm: registrationFormContainer, loginBtn };
};
