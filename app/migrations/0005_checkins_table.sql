-- Phase 4.6: persisted check-ins. Replaces the old "Sunday Summary"
-- concept (one ephemeral generation, gone on page reload) with a
-- permanent, dated record every time a check-in is generated --
-- whether the user taps "Check where I'm at" (source = 'manual') or
-- the weekly background job runs it for them (source = 'auto').
-- payload_json holds the full computed result (period/tone/message/
-- categories/top_pattern) so Inbox and Summaries can both render any
-- past check-in exactly like a fresh one, without recomputing it.
-- IF NOT EXISTS makes this safe to run every startup, same as 0003/0004.
CREATE TABLE IF NOT EXISTS checkins (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      INTEGER NOT NULL REFERENCES users(id),
  source       TEXT NOT NULL CHECK (source IN ('manual', 'auto')),
  tone         TEXT NOT NULL,
  message      TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_checkins_user_created ON checkins(user_id, created_at);
