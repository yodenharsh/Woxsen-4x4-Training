const pool = require("../config/database");

class Book {
  static async create(name, yearOfPublication, isbn, volumeInStock) {
    const result = await pool.query(
      "INSERT INTO books (name, year_of_publication, isbn, volume_in_stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, yearOfPublication, isbn, volumeInStock]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM books");
    return result.rows;
  }

  static async updateStock(id, quantity) {
    const result = await pool.query(
      "UPDATE books SET volume_in_stock = volume_in_stock + $1 WHERE id = $2 RETURNING *",
      [quantity, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
  }
}

module.exports = Book;
