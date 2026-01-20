import { pool } from "../config/db";
import bcrypt from "bcryptjs";

const seed = async () => {
  console.log("Starting seed");

 
  await pool.query(`
    INSERT INTO roles (id, role_name)
    VALUES  
      (1, 'ADMIN'),
      (2, 'USER')
    ON CONFLICT (id) DO NOTHING;
  `);

  console.log("Roles seeded");


  const email = process.env.ADMIN_EMAIL!;
  const username = process.env.ADMIN_USERNAME!;
  const password = process.env.ADMIN_PASSWORD!;

  if (!email || !username || !password) {
    throw new Error("Admin credentials missing in .env");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    `
    INSERT INTO users (
      name,
      username,
      email,
      password_hash,
      role_id,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, true)
    ON CONFLICT (email) DO NOTHING;
    `,
    [
      "ADMIN",
      username,
      email,
      passwordHash,
      1, 
    ]
  );

  console.log("System admin seeded");

  console.log("Seed completed successfully");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
