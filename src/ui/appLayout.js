import githubLogo from "../img/github-mark.svg";
import canvasLab from "../img/canvasLab.svg";

export default function appLayout(content, username = "User") {
  const container = document.createElement("div");
  container.classList.add("app-container");

  const header = document.createElement("header");
  header.classList.add("app-header");

  const logo = document.createElement("img");
  logo.src = canvasLab;
  logo.classList.add("header-logo");

  const user = document.createElement("div");
  user.classList.add("header-user");
  user.textContent = username;

  header.appendChild(logo);
  header.appendChild(user);

  const main = document.createElement("main");
  main.classList.add("app-main");
  main.appendChild(content);

  const footer = document.createElement("footer");
  footer.classList.add("app-footer");

  const text = document.createElement("p");
  text.textContent = "JavedanCode";

  const link = document.createElement("a");
  link.href = "https://github.com/JavedanCode";

  const icon = document.createElement("img");
  icon.src = githubLogo;
  icon.classList.add("github-logo");

  link.appendChild(icon);
  footer.appendChild(text);
  footer.appendChild(link);

  container.appendChild(header);
  container.appendChild(main);
  container.appendChild(footer);

  return container;
}
