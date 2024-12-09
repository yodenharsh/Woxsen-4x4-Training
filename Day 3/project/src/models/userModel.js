const pool = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async create(name, email, phoneNumber, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phoneNumber, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
module.exports = User;
