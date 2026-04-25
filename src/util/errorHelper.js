export function showError(input, message) {
  input.classList.add("input-error");

  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("error-text")) {
    error = document.createElement("span");
    error.classList.add("error-text");
    input.parentNode.insertBefore(error, input.nextSibling);
  }

  error.textContent = message;
}

export function clearError(input) {
  input.classList.remove("input-error");

  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-text")) {
    error.remove();
  }
}
