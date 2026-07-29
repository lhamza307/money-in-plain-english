// Field-level encryption at rest for financial data (Phase 0.6).
//
// SQLite has no native encryption in the driver we're using
// (better-sqlite3), so this encrypts individual sensitive columns --
// merchant identity and dollar amounts -- before they're written, and
// decrypts them after they're read. Everything else (dates, category
// IDs, account IDs) stays plaintext so Phase 3/4's date-range and
// category queries can still run in SQL; only the actual "financial
// data" columns pay the encrypt/decrypt cost.
//
// AES-256-GCM: authenticated encryption, so a tampered ciphertext
// fails decryption loudly instead of silently returning garbage.
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;   // recommended nonce size for GCM
const TAG_LENGTH = 16;

// Dev-only secret so local development works with zero setup, exactly
// like SESSION_SECRET's dev default below. Never valid in production --
// guarded the same way.
const DEV_ONLY_SECRET = 'dev-only-encryption-key-not-for-production';

// ENCRYPTION_KEY can be any length/format string -- Render's
// generateValue (used in render.yaml) doesn't promise a value that
// base64-decodes to exactly 32 bytes, so requiring that shape here
// would risk production refusing to boot on a config detail out of our
// control. Hashing down to 32 bytes accepts any secret string, the
// same way SESSION_SECRET does.
function loadKey() {
  const raw = process.env.ENCRYPTION_KEY || DEV_ONLY_SECRET;
  if (process.env.NODE_ENV === 'production' && !process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY must be set in production -- refusing to start with the public dev default.');
  }
  return crypto.createHash('sha256').update(raw, 'utf8').digest();
}

const KEY = loadKey();

// Returns a single base64 blob: iv || authTag || ciphertext.
function encryptField(plaintext) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, ciphertext]).toString('base64');
}

function decryptField(blob) {
  const buf = Buffer.from(blob, 'base64');
  const iv = buf.subarray(0, IV_LENGTH);
  const authTag = buf.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const ciphertext = buf.subarray(IV_LENGTH + TAG_LENGTH);
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

module.exports = { encryptField, decryptField };
