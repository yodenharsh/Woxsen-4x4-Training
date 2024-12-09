import os
from dotenv import find_dotenv, load_dotenv
import psycopg
from pypika import Query, Table


conn = None
dot_env = find_dotenv(filename=".env", raise_error_if_not_found=False)
load_dotenv(dot_env)


def init_conn():
    global conn
    db_name, host, port, username, password = os.getenv("DB_NAME"), os.getenv(
        "DB_HOST"), os.getenv("DB_PORT"), os.getenv("DB_USERNAME"), os.getenv("DB_PASSWORD")

    print(", ".join([db_name, host, port, username, password]))

    try:
        conn = psycopg.connect(
            f"dbname={db_name} host={host} user={username} password={password} port={port}")
        print("Connected to DB successfully")
    except Exception as err:
        print("Database couldn't be connected")
        print(err)


def get_conn():
    global conn
    return conn


def test_add_query():

    query = Query.into(Table("books")).columns("name", "year_of_publication", "isbn", "volume_in_stock").insert(
        "Sons of Gods", 2019, "ISBN232011:22", 44)
    print(query.get_sql())
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(query.get_sql())
    conn.commit()
    cursor.close()


if __name__ == "__main__":
    init_conn()
