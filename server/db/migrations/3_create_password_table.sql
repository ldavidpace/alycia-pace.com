
CREATE TABLE IF NOT EXISTS passwords (
    id          integer PRIMARY KEY AUTOINCREMENT,
    userId      integer REFERENCES users (id),
    password    varchar(1000)
);



