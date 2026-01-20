"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.deleteRefreshTokensByUser = exports.findRefreshToken = exports.saveRefreshToken = exports.findUserByEmail = void 0;
const db_1 = require("../config/db");
const findUserByEmail = async (email) => {
    const result = await db_1.pool.query(`SELECT u.id, u.email, u.password_hash, r.role_name
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = $1`, [email]);
    return result.rows[0];
};
exports.findUserByEmail = findUserByEmail;
const saveRefreshToken = async (userId, token) => {
    await db_1.pool.query(`INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, now() + interval '7 days')`, [userId, token]);
};
exports.saveRefreshToken = saveRefreshToken;
const findRefreshToken = async (token) => {
    const result = await db_1.pool.query("SELECT * FROM refresh_tokens WHERE token=$1", [token]);
    return result.rows[0];
};
exports.findRefreshToken = findRefreshToken;
const deleteRefreshTokensByUser = async (userId) => {
    await db_1.pool.query("DELETE FROM refresh_tokens WHERE user_id=$1", [userId]);
};
exports.deleteRefreshTokensByUser = deleteRefreshTokensByUser;
const findUserById = async (id) => {
    const result = await db_1.pool.query(`SELECT id, email, username, is_active
     FROM users WHERE id=$1`, [id]);
    return result.rows[0];
};
exports.findUserById = findUserById;
