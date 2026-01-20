"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seed = async () => {
    console.log("Starting seed");
    await db_1.pool.query(`
    INSERT INTO roles (id, role_name)
    VALUES  
      (1, 'ADMIN'),
      (2, 'USER')
    ON CONFLICT (id) DO NOTHING;
  `);
    console.log("Roles seeded");
    const email = process.env.ADMIN_EMAIL;
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !username || !password) {
        throw new Error("Admin credentials missing in .env");
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    await db_1.pool.query(`
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
    `, [
        "ADMIN",
        username,
        email,
        passwordHash,
        1,
    ]);
    console.log("System admin seeded");
    console.log("Seed completed successfully");
    process.exit(0);
};
seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
