import pool from "../config/db";

/**
 * Create user (by Admin)
 */
export const createUser = async (data: {
  name: string;
  email: string;
  username: string;
  password_hash: string;
  role_id: number;
}) => {
  const { name, email, username, password_hash, role_id } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO users (name, email, username, password_hash, role_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, username, role_id, is_active, created_at
    `,
    [name, email, username, password_hash, role_id]
  );

  return rows[0];
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const { rows } = await pool.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.username,
      r.role_name AS role,
      u.is_active,
      u.created_at
    FROM users u
    JOIN roles r ON r.id = u.role_id
    ORDER BY u.created_at DESC
    `
  );

  return rows;
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string) => {
  const { rows } = await pool.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.username,
      r.role_name AS role,
      u.is_active,
      u.created_at
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.id = $1
    `,
    [id]
  );

  return rows[0];
};

/**
 * Update user by ID (Admin)
 */
export const updateUserById = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    username?: string;
    role_id?: number;
    is_active?: boolean;
  }
) => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key in data) {
    fields.push(`${key} = $${index}`);
    values.push((data as any)[key]);
    index++;
  }

  if (!fields.length) return null;

  const { rows } = await pool.query(
    `
    UPDATE users
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${index}
    RETURNING id, name, email, username, role_id, is_active, updated_at
    `,
    [...values, id]
  );

  return rows[0];
};

/**
 * Delete user (Hard delete)
 */
export const deleteUserById = async (id: string) => {
  await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
};
