const {getUserById} = require("../services/userService.js");
const db = require("../config/db.js");

//MOCK DB
jest.mock("../config/db");

test("should return a user when found", async () => {
    db.query.mockResolvedValue({
        rows: [{id:1, username: "test"}],

    });

    const user = await getUserById(1);

    expect(user).toEqual({id: 1, username: "test"});
});

test("should return undefined if user not found", async () => {
    db.query.mockResolvedValue({ rows: [] });

    const user = await getUserById(999);

    expect(user).toBeUndefined();
})