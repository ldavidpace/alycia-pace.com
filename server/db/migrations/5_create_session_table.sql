

CREATE TABLE IF NOT EXISTS sessions (
    id          integer PRIMARY KEY AUTOINCREMENT,
    userId      integer NOT NULL REFERENCES users (id),
    sessionId   varchar(256) NOT NULL,
    expiresAt    bigint NOT NULL
)