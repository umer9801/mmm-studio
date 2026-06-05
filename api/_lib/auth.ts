/**
 * Shared auth utilities for Vercel API functions.
 * Each function that needs auth imports from here.
 */

export function getSecret(): string {
  return process.env.JWT_SECRET ?? "mmm-studio-secret-key-2024";
}

export function createToken(payload: object): string {
  const secret = getSecret();
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(
    JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 86400000 })
  ).toString("base64url");
  const signature = Buffer.from(secret + header + body).toString("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { valid: boolean; expired?: boolean } {
  try {
    const secret = getSecret();
    const parts = token.split(".");
    if (parts.length !== 3) return { valid: false };
    const [header, body, sig] = parts;
    if (!header || !body || !sig) return { valid: false };

    const expectedSig = Buffer.from(secret + header + body).toString("base64url");
    if (sig !== expectedSig) return { valid: false };

    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      exp?: number;
    };
    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false, expired: true };
    }
    return { valid: true };
  } catch {
    return { valid: false };
  }
}

export function authenticate(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  return verifyToken(authHeader.slice(7)).valid;
}
