
DROP DATABASE IF EXISTS "microblog-db";

CREATE DATABASE "microblog-db";

\c "microblog-db"
CREATE TABLE posts (id SERIAL PRIMARY KEY, title TEXT, body TEXT);
CREATE TABLE comments (id SERIAL PRIMARY KEY, text TEXT, post_id INTEGER REFERENCES "posts" (id) ON DELETE CASCADE);

INSERT INTO posts (title, body) VALUES ('first post', 'best post ever!');
INSERT INTO posts (title, body) VALUES ('second post', 'second best post ever!');

INSERT INTO comments (text, post_id) VALUES ('first comment', 1);
INSERT INTO comments (text, post_id) VALUES ('second comment', 1);