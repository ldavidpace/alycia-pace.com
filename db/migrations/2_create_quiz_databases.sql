
CREATE TABLE IF NOT EXISTS quiz (
    id          integer PRIMARY KEY AUTOINCREMENT,
    name        varchar(100) UNIQUE CHECK (name <> '')
);

CREATE TABLE IF NOT EXISTS questions (
    id          integer PRIMARY KEY AUTOINCREMENT,
    quiz_id     integer NOT NULL REFERENCES quiz (id),
    question    varchar(2000) NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
    id          integer PRIMARY KEY AUTOINCREMENT,
    question_id integer NOT NULL REFERENCES questions (id),
    answers     varchar(2000) NOT NULL
);
