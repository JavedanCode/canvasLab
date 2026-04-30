const db = require ("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async() => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
};

const getUserById = async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1",[id]);
    return result.rows[0];
};

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
        `INSERT INTO users(username, email, password_hash)
        VALUES($1, 2$, 3$)
        RETURNING id`, [username,email,hashedPassword]
    );

    return result.rows[0];
};

const removeUser = async (id) => {
    const result = await db.query(
        `DELETE FROM users WHERE id = 1$ RETURNING *`,
        [id]
    );
    return result.rowCount;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    removeUser,
};