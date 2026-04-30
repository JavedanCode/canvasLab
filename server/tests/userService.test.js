const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  loginUser,
} = require("../services/userService");

jest.mock("../config/db");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

beforeEach(() => {
  jest.clearAllMocks();
});

//
// GET ALL USERS
//
test("getAllUsers returns users", async () => {
  db.query.mockResolvedValue({
    rows: [{ id: 1 }, { id: 2 }],
  });

  const users = await getAllUsers();

  expect(users.length).toBe(2);
});

//
// GET USER BY ID
//
test("getUserById returns user", async () => {
  db.query.mockResolvedValue({
    rows: [{ id: 1, username: "test" }],
  });

  const user = await getUserById(1);

  expect(user.username).toBe("test");
});

test("getUserById returns undefined if not found", async () => {
  db.query.mockResolvedValue({ rows: [] });

  const user = await getUserById(999);

  expect(user).toBeUndefined();
});

//
// CREATE USER
//
test("createUser hashes password and inserts user", async () => {
  bcrypt.hash.mockResolvedValue("hashed");

  db.query.mockResolvedValue({
    rows: [{ id: 1 }],
  });

  const user = await createUser("john", "john@mail.com", "123456");

  expect(bcrypt.hash).toHaveBeenCalled();
  expect(user.id).toBe(1);
});

//
// REMOVE USER
//
test("removeUser deletes user", async () => {
  db.query.mockResolvedValue({
    rowCount: 1,
  });

  const result = await removeUser(1);

  expect(result).toBe(1);
});

test("removeUser returns 0 if user not found", async () => {
  db.query.mockResolvedValue({
    rowCount: 0,
  });

  const result = await removeUser(999);

  expect(result).toBe(0);
});

//
// LOGIN USER
//
test("loginUser returns token and user on success", async () => {
  db.query.mockResolvedValue({
    rows: [
      {
        id: 1,
        username: "test",
        email: "test@mail.com",
        password_hash: "hashed",
      },
    ],
  });

  bcrypt.compare.mockResolvedValue(true);
  jwt.sign.mockReturnValue("token123");

  const result = await loginUser("test@mail.com", "123");

  expect(result.token).toBe("token123");
  expect(result.user.username).toBe("test");
});

test("loginUser throws if user not found", async () => {
  db.query.mockResolvedValue({ rows: [] });

  await expect(loginUser("no@mail.com", "123")).rejects.toThrow(
    "INVALID_CREDENTIALS",
  );
});

test("loginUser throws if password incorrect", async () => {
  db.query.mockResolvedValue({
    rows: [
      {
        id: 1,
        password_hash: "hashed",
      },
    ],
  });

  bcrypt.compare.mockResolvedValue(false);

  await expect(loginUser("test@mail.com", "wrong")).rejects.toThrow(
    "INVALID_CREDENTIALS",
  );
});
