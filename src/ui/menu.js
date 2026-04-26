import appLayout from "./appLayout.js";
import canvas from "./canvas.js";
import { navigateTo } from "../index.js";

export default function menu() {
  const content = document.createElement("div");
  content.classList.add("menu-container");

  const grid = document.createElement("div");
  grid.classList.add("card-grid");

  let paintings = [];

  async function loadPaintings() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://canvaslab.onrender.com/paintings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      paintings = data.data; // 🔥 important
      renderCards();
    } catch (error) {
      console.error("Failed to load paintings:", error);
    }
  }

  function renderCards() {
    grid.innerHTML = "";

    paintings.forEach((painting, index) => {
      // Later when I connect back end the cards much come from database
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("p");
      title.textContent = painting.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");

      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();

        const confirmDelete = confirm("Delete this painting?");
        if (!confirmDelete) return;

        try {
          const token = localStorage.getItem("token");

          const response = await fetch(
            `https://canvaslab.onrender.com/paintings/${painting.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await response.json();

          if (!response.ok) {
            alert(data.message || "Delete failed");
            return;
          }

          // 🔥 remove from UI
          paintings = paintings.filter((p) => p.id !== painting.id);

          renderCards(); // refresh UI
        } catch (error) {
          console.error(error);
          alert("Server error");
        }
      });

      card.appendChild(title);
      card.appendChild(deleteBtn);

      card.addEventListener("click", () => {
        navigateTo(() =>
          canvas({
            id: painting.id,
            title: painting.title,
          }),
        );
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
    });

    grid.appendChild(addCard);
  }

  loadPaintings();

  content.appendChild(grid);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "Guest";

  return appLayout(content, username);
}
