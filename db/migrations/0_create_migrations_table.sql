

CREATE TABLE IF NOT EXISTS migrations (
    id              integer PRIMARY KEY AUTOINCREMENT,
    migration_name  varchar(1000) NOT NULL,
    sha             varchar(512) NOT NULL,
    execution_date  datetime DEFAULT CURRENT_TIMESTAMP
)
