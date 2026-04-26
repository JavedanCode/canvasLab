import { navigateTo } from "../index.js";
import menu from "./menu.js";

export default function canvas() {
  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Canvas Page";

  const backBtn = document.createElement("button");
  backBtn.textContent = "Back";

  backBtn.addEventListener("click", () => {
    navigateTo(menu);
  });

  container.appendChild(title);
  container.appendChild(backBtn);

  return container;
}
