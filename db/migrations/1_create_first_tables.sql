CREATE TABLE IF NOT EXISTS users (
    id          integer PRIMARY KEY AUTOINCREMENT,
    userName    varchar(100) UNIQUE CHECK (userName <> ''),
    email       varchar(240) UNIQUE check (email <> ''),
    authority   TEXT NOT NULL CHECK (  authority IN ('user','admin') ) 
);


INSERT into users (userName, email, authority)
VALUES ('David Pace', 'ldavidpace@gmail.com', 'admin'),
    ('Alycia Pace', 'alyciapaceart@gmail.com', 'admin');
