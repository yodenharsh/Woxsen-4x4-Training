from common import dbConn
from common.pypika_tables import book_table
from types import bookTypes
from pypika import Query


class BookService:

    @staticmethod
    def insert_book(book_info: InsertableBook):
        conn = dbConn.get_conn()

        cursor = conn.cursor()
        query = Query.into(book_table).columns("name", "year_of_publication", "isbn", "volume_in_stock").insert(
            book_info["name"], book_info["year_of_publication"], book_info["isbn"], book_info["volume_in_stock"]
        ).get_sql()
        print(query)

        cursor.execute(query)
        conn.commit()

        cursor.close()

    @staticmethod
    def get_books():
        conn = dbConn.get_conn()
        cursor = conn.cursor()

        query = Query.from_(book_table).select("*").get_sql()
        cursor.execute(query)

        cursor.fetchall()
        book_list = [book for book in cursor]

        cursor.close()

        return book_list
