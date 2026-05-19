const argon2 = require('@node-rs/argon2');

/**
 * Password hashing — Argon2id.
 *
 * Argon2id (the default algorithm in @node-rs/argon2) is memory-hard,
 * which resists GPU / ASIC cracking far better than bcrypt. The
 * parameters below follow OWASP's recommended Argon2id configuration.
 *
 * The resulting hash string embeds the algorithm, parameters and salt,
 * so nothing else needs to be stored alongside it.
 */
const HASH_OPTIONS = {
  memoryCost: 19456, // 19 MiB of memory per hash
  timeCost: 2, // iterations
  parallelism: 1, // parallel lanes
};

/** Hash a plaintext password into an Argon2id hash string. */
const hashPassword = (password) => argon2.hash(password, HASH_OPTIONS);

/**
 * Verify a plaintext password against a stored Argon2id hash.
 * Returns false (rather than throwing) for malformed / legacy hashes,
 * so a bad hash simply fails the login instead of crashing the request.
 */
const verifyPassword = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
};

module.exports = { hashPassword, verifyPassword };
