import bcrypt from "bcryptjs";

export function verifyAdminCredentials(
  username: string,
  password: string,
): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUser || username !== expectedUser) {
    return false;
  }

  if (passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  }

  if (!expectedPassword) {
    return false;
  }

  return password === expectedPassword;
}
