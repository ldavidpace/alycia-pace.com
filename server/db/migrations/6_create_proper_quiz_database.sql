

drop table quiz;

Create Table Quiz (
    id          integer PRIMARY KEY AUTOINCREMENT,
    userId      integer NOT NULL REFERENCES users (id),
    name        varchar(1000) NOT NULL,
    imageUrl    varchar(200) NOT NULL
)