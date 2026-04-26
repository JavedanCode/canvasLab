import { navigateTo } from "../index.js";
import appLayout from "./appLayout.js";
import menu from "./menu.js";

export default function canvas({ title = "Untitled", id = null } = {}) {
  const content = document.createElement("div");
  content.classList.add("canvas-page");

  const topBar = document.createElement("div");
  topBar.classList.add("canvas-topbar");

  let currentTitle = title;
  const titleEl = document.createElement("h2");
  titleEl.classList.add("canvas-title");
  titleEl.textContent = currentTitle;

  titleEl.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.classList.add("title-input");
    input.value = currentTitle;

    const finish = () => {
      const newTitle = input.value.trim() || "Untitled";
      currentTitle = newTitle;
      titleEl.textContent = currentTitle;
      input.replaceWith(titleEl);
    };

    input.addEventListener("blur", finish);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
      if (e.key === "Escape") {
        input.value = currentTitle;
        input.blur();
      }
    });

    titleEl.replaceWith(input);
    input.focus();
  });

  const tools = document.createElement("div");
  tools.classList.add("tools");

  const brushBtn = makeToolButton("Brush");
  const eraserBtn = makeToolButton("Eraser");
  const clearBtn = makeToolButton("Clear");

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = "#000000";
  colorInput.classList.add("color-picker");

  const sizeInput = document.createElement("input");
  sizeInput.type = "range";
  sizeInput.min = "1";
  sizeInput.max = "40";
  sizeInput.value = "5";
  sizeInput.classList.add("size-slider");

  tools.append(brushBtn, eraserBtn, clearBtn, colorInput, sizeInput);

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("form-btn");
  saveBtn.textContent = "Save";

  const backBtn = document.createElement("button");
  backBtn.classList.add("form-btn");
  backBtn.textContent = "Back";
  backBtn.addEventListener("click", () => navigateTo(menu));

  topBar.append(titleEl, tools, saveBtn, backBtn);

  const canvasEl = document.createElement("canvas");
  canvasEl.classList.add("paint-canvas");

  const wrapper = document.createElement("div");
  wrapper.classList.add("canvas-wrapper");
  wrapper.appendChild(canvasEl);

  content.append(topBar, wrapper);

  const ctx = canvasEl.getContext("2d");
  let drawing = false;
  let tool = "brush";
  let color = colorInput.value;
  let size = +sizeInput.value;

  function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    canvasEl.width = rect.width;
    canvasEl.height = rect.height;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  async function loadPainting() {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/paintings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      const image = new Image();
      image.src = data.data.image_data;

      image.onload = () => {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        ctx.drawImage(image, 0, 0, canvasEl.width, canvasEl.height);
      };
    } catch (error) {
      console.error("Failed to load painting:", error);
    }
  }

  requestAnimationFrame(() => {
    resizeCanvas();
    loadPainting();
  });
  window.addEventListener("resize", resizeCanvas);

  function start(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
  }

  function move(e) {
    if (!drawing) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
    }

    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
  }

  function end() {
    drawing = false;
    ctx.closePath();
  }

  function getX(e) {
    const rect = canvasEl.getBoundingClientRect();
    return (e.clientX ?? e.touches?.[0].clientX) - rect.left;
  }

  function getY(e) {
    const rect = canvasEl.getBoundingClientRect();
    return (e.clientY ?? e.touches?.[0].clientY) - rect.top;
  }

  canvasEl.addEventListener("mousedown", start);
  canvasEl.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);

  canvasEl.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      start(e);
    },
    { passive: false },
  );
  canvasEl.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      move(e);
    },
    { passive: false },
  );

  window.addEventListener("touchend", end);

  brushBtn.onclick = () => {
    tool = "brush";
    setActive(brushBtn, tools);
  };
  eraserBtn.onclick = () => {
    tool = "eraser";
    setActive(eraserBtn, tools);
  };
  clearBtn.onclick = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  };

  colorInput.oninput = () => (color = colorInput.value);
  sizeInput.oninput = () => (size = +sizeInput.value);

  setActive(brushBtn, tools);

  let originalTitle = title;

  saveBtn.addEventListener("click", async () => {
    const imageData = canvasEl.toDataURL("image/png");
    const token = localStorage.getItem("token");

    try {
      let response;

      // CREATE
      if (!id) {
        response = await fetch("http://localhost:3000/paintings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: currentTitle,
            image_data: imageData,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to save");
          return;
        }

        id = data.paintingId;

        alert("Painting created!");
      }

      // UPDATE
      else {
        response = await fetch(`http://localhost:3000/paintings/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: currentTitle,
            image_data: imageData,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Update failed");
          return;
        }

        alert("Painting updated!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "Guest";

  return appLayout(content, username);
}

function makeToolButton(label) {
  const btn = document.createElement("button");
  btn.classList.add("tool-btn");
  btn.textContent = label;
  return btn;
}

function setActive(btn, tools) {
  tools
    .querySelectorAll(".tool-btn")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");
}
