

ALTER TABLE quiz RENAME to quiz_old; 


Create Table QUIZ (
    id          integer PRIMARY KEY AUTOINCREMENT,
    userId      integer NOT NULL REFERENCES users (id),
    name        varchar(1000) NOT NULL,
    imageUrl    varchar(200) NOT NULL,
    type        varchar(200)
);

INSERT into quiz (id, userId, name, imageUrl)
    Select id, userId, name, imageUrl from quiz_old;


drop table quiz_old;


