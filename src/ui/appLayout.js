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

  const userContainer = document.createElement("div");
  userContainer.classList.add("header-user-container");

  const user = document.createElement("div");
  user.classList.add("header-user");
  user.textContent = username;

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.classList.add("logout-btn");

  logoutBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(
        "https://canvaslab.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      console.log(data);

      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
    }
  });

  userContainer.appendChild(user);
  userContainer.appendChild(logoutBtn);

  header.appendChild(logo);
  header.appendChild(userContainer);

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
