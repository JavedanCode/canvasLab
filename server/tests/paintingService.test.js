const db = require("../config/db");

const {
  getUserPaintings,
  getPaintingById,
  createPainting,
  updatePaintingById,
  deletePaintingById,
} = require("../services/paintingService");

jest.mock("../config/db");

beforeEach(() => {
  jest.clearAllMocks();
});

//
// GET USER PAINTINGS
//
test("getUserPaintings returns paintings", async () => {
  db.query.mockResolvedValue({
    rows: [{ id: 1 }, { id: 2 }],
  });

  const result = await getUserPaintings(1);

  expect(result.length).toBe(2);
});

//
// GET ONE
//
test("getPaintingById returns painting", async () => {
  db.query.mockResolvedValue({
    rows: [{ id: 1, title: "test" }],
  });

  const painting = await getPaintingById(1, 1);

  expect(painting.title).toBe("test");
});

test("getPaintingById returns undefined if not found", async () => {
  db.query.mockResolvedValue({ rows: [] });

  const painting = await getPaintingById(999, 1);

  expect(painting).toBeUndefined();
});

//
// CREATE
//
test("createPainting returns new painting id", async () => {
  db.query.mockResolvedValue({
    rows: [{ id: 5 }],
  });

  const painting = await createPainting("title", "img", 1);

  expect(painting.id).toBe(5);
});

//
// UPDATE
//
test("updatePaintingById updates painting", async () => {
  db.query.mockResolvedValue({
    rowCount: 1,
  });

  const result = await updatePaintingById(1, "new", "img", 1);

  expect(result).toBe(1);
});

test("updatePaintingById returns 0 if not found", async () => {
  db.query.mockResolvedValue({
    rowCount: 0,
  });

  const result = await updatePaintingById(999, "new", "img", 1);

  expect(result).toBe(0);
});

//
// DELETE
//
test("deletePaintingById deletes painting", async () => {
  db.query.mockResolvedValue({
    rowCount: 1,
  });

  const result = await deletePaintingById(1, 1);

  expect(result).toBe(1);
});

test("deletePaintingById returns 0 if not found", async () => {
  db.query.mockResolvedValue({
    rowCount: 0,
  });

  const result = await deletePaintingById(999, 1);

  expect(result).toBe(0);
});
