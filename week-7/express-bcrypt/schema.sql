-- psql < schema.sql

DROP DATABASE IF EXISTS "express-bcrypt-db";
CREATE DATABASE "express-bcrypt-db";
\c "express-bcrypt-db"

CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);