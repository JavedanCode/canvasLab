const {
  getUserPaintings,
  getPaintingById,
  createPainting,
  updatePaintingById,
  deletePaintingById,
} = require("../services/paintingService.js");

// GET ALL
const getPaintings = async (req, res) => {
  try {
    const paintings = await getUserPaintings(req.user.id);
    return res.status(200).json({ data: paintings });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET ONE
const getPainting = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  try {
    const painting = await getPaintingById(id, req.user.id);

    if (!painting) {
      return res.status(404).json({ message: "Painting doesn't exist" });
    }

    return res.status(200).json({ data: painting });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE
const createCanvas = async (req, res) => {
  const { image_data, title = "untitled" } = req.body;

  if (!image_data) {
    return res.status(400).json({ message: "No image data" });
  }

  try {
    const painting = await createPainting(title, image_data, req.user.id);

    return res.status(201).json({
      message: "Canvas Created Successfully",
      paintingId: painting.id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
const updatePainting = async (req, res) => {
  const id = req.params.id;
  const { title, image_data } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  try {
    const updated = await updatePaintingById(
      id,
      title,
      image_data,
      req.user.id,
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Painting doesn't exist" });
    }

    return res.status(200).json({ message: "Painting updated successfully" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
const deletePainting = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  try {
    const deleted = await deletePaintingById(id, req.user.id);

    if (deleted === 0) {
      return res.status(404).json({ message: "Painting not found" });
    }

    return res.status(200).json({ message: "Painting deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPaintings,
  getPainting,
  createCanvas,
  updatePainting,
  deletePainting,
};
