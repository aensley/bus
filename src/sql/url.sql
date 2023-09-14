CREATE TABLE IF NOT EXISTS url (short TEXT NOT NULL PRIMARY KEY, long TEXT NOT NULL, created INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS idx_url_long ON url(long);
CREATE INDEX IF NOT EXISTS idx_url_short_long ON url(short, long);
