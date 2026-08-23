const BASE = '/api/auth';

/**
 * Register a new user.
 * @param {string} email
 * @param {string} password
 * @param {'donor'|'hospital'} role
 * @returns {Promise<{token: string, role: string}>}
 */
export async function registerUser(email, password, role) {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
}

/**
 * Log in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, role: string}>}
 */
export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

/** Save JWT token to localStorage */
export function saveToken(token) {
  localStorage.setItem('token', token);
}

/** Get JWT token from localStorage */
export function getToken() {
  return localStorage.getItem('token');
}

/** Remove token (logout) */
export function clearToken() {
  localStorage.removeItem('token');
}

/** Returns an Authorization header object for authenticated API calls */
export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
