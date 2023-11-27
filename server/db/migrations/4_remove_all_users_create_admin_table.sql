
Delete from passwords;
Delete from users;

CREATE TABLE IF NOT EXISTS admins (
    id          integer PRIMARY KEY AUTOINCREMENT,
    email       varchar(240) UNIQUE check (email <> '')
);

INSERT into admins (email) VALUES 
    ('ldavidpace@gmail.com'), 
    ('alyciapaceart@gmail.com');