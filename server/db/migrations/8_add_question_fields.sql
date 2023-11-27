


alter table questions
    rename to question_old;

CREATE TABLE question (
    id              integer PRIMARY KEY AUTOINCREMENT,
    quiz_id         integer NOT NULL REFERENCES quiz (id),
    questionText    varchar(2000) NOT NULL,
    questionOrder   integer
);


