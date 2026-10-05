// Generates the CMS_ADMIN_PASSWORD_HASH value for the /admin-cms login.
// Usage: node scripts/cms-password-hash.mjs "your-new-password"
import { pbkdf2Sync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/cms-password-hash.mjs "your-new-password"');
  process.exit(1);
}

const iterations = 210000;
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
console.log(`pbkdf2:${iterations}:${salt.toString("hex")}:${hash.toString("hex")}`);
