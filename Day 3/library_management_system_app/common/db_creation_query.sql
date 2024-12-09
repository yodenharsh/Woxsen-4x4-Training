CREATE DATABASE IF NOT EXISTS lib_db;
USE lib_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    phone_number VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);

CREATE TABLE books (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    year_of_publication INTEGER,
    isbn VARCHAR,
    volume_in_stock INTEGER NOT NULL
);

CREATE TABLE rentals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    book_id UUID NOT NULL,
    rent_date TIMESTAMP NOT NULL,
    return_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
