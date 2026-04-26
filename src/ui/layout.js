import githubLogo from "../img/github-mark.svg";
import canvasLab from "../img/canvasLab.svg";

export default () => {
  const main = document.createElement("main");
  const section = document.createElement("section");
  const logo = document.createElement("img");
  const footer = document.createElement("footer");
  const github_logo = document.createElement("img");
  const github_link = document.createElement("a");
  const footerText = document.createElement("p");

  main.appendChild(section);
  section.appendChild(logo);
  github_link.appendChild(github_logo);
  footer.appendChild(footerText);
  footer.appendChild(github_link);

  github_logo.id = "github-logo";
  logo.id = "logo";
  main.classList.add("auth-main");

  footerText.textContent = "JavedanCode";
  github_link.href = "https://github.com/JavedanCode";
  github_logo.src = githubLogo;

  logo.src = canvasLab;
  logo.alt = "Canvas Lab Logo";

  document.body.appendChild(main);
  document.body.appendChild(footer);

  return { sectionRef: section, logo };
};
