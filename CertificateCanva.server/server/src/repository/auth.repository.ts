import { pool } from "../config/db";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT u.id, u.email, u.password_hash, r.role_name
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = $1`,
    [email]
  );
  return result.rows[0];
};

export const saveRefreshToken = async (userId: string, token: string) => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, now() + interval '7 days')`,
    [userId, token]
  );
};

export const findRefreshToken = async (token: string) => {
  const result = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token=$1",
    [token]
  );
  return result.rows[0];
};

export const deleteRefreshTokensByUser = async (userId: string) => {
  await pool.query(
    "DELETE FROM refresh_tokens WHERE user_id=$1",
    [userId]
  );
};

export const findUserById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, email, username, is_active
     FROM users WHERE id=$1`,
    [id]
  );
  return result.rows[0];
};
