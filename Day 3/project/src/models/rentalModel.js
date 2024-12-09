const pool = require("../config/database");

class Rental {
  static async create(userId, bookId) {
    const result = await pool.query(
      "INSERT INTO rentals (user_id, book_id, rent_date) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
      [userId, bookId]
    );
    return result.rows[0];
  }

  static async return(id) {
    const result = await pool.query(
      "UPDATE rentals SET return_date = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query(`
      SELECT r.*, u.name as user_name, b.name as book_name 
      FROM rentals r 
      JOIN users u ON r.user_id = u.id 
      JOIN books b ON r.book_id = b.id
    `);
    return result.rows;
  }

  static async getUserRentals(userId) {
    const result = await pool.query(
      `SELECT r.*, b.name as book_name 
       FROM rentals r 
       JOIN books b ON r.book_id = b.id 
       WHERE r.user_id = $1`,
      [userId]
    );
    return result.rows;
  }
}

module.exports = Rental;
