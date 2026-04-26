import appLayout from "./appLayout.js";
import canvas from "./canvas.js";
import { navigateTo } from "../index.js";

export default function menu() {
  const content = document.createElement("div");
  content.classList.add("menu-container");

  const grid = document.createElement("div");
  grid.classList.add("card-grid");

  let paintings = [];

  function renderCards() {
    grid.innerHTML = "";

    paintings.forEach((painting, index) => {
      // Later when I connect back end the cards much come from database
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("p");
      title.textContent = painting.title;

      card.appendChild(title);

      card.addEventListener("click", () => {
        console.log("Open painting", index);
      });

      grid.appendChild(card);
    });

    const addCard = document.createElement("div");
    addCard.classList.add("card", "add-card");
    addCard.textContent = "+";

    addCard.addEventListener("click", () => {
      //Later we move user to their canvas.
      //   paintings.push({
      //     title: `Untitled ${paintings.length + 1}`,
      //   });
      navigateTo(canvas);

      renderCards();
    });

    grid.appendChild(addCard);
  }

  renderCards();

  content.appendChild(grid);

  return appLayout(content, "Soren");
}
