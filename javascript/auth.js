// js/auth.js
// A tiny local "database" using localStorage, styled like a JSON db.
// Good for demos/college projects — no server required.
// NOTE: this is NOT secure storage (passwords aren't properly hashed
// with a real algorithm). Fine for a local demo, not for production.

const DB_KEY = "edunova_db";       // stores { users: [...] }
const SESSION_KEY = "edunova_session"; // stores { uid, name, email }

// ---------- low-level "database" helpers ----------

function readDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const empty = { users: [] };
    localStorage.setItem(DB_KEY, JSON.stringify(empty));
    return empty;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const empty = { users: [] };
    localStorage.setItem(DB_KEY, JSON.stringify(empty));
    return empty;
  }
}

function writeDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Very simple non-cryptographic hash so plaintext passwords
// at least aren't sitting in localStorage as-is.
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

function genId() {
  return "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ---------- public API ----------

/**
 * Register a new user.
 * @returns {Promise<{ok:boolean, message?:string, user?:object}>}
 */
function registerUser({ name, email, password }) {
  return new Promise((resolve) => {
    email = (email || "").trim().toLowerCase();
    name = (name || "").trim();

    if (!name || !email || !password) {
      return resolve({ ok: false, message: "All fields are required." });
    }
    if (password.length < 6) {
      return resolve({ ok: false, message: "Password must be at least 6 characters." });
    }

    const db = readDB();
    const exists = db.users.some((u) => u.email === email);
    if (exists) {
      return resolve({ ok: false, message: "An account with this email already exists." });
    }

    const user = {
      uid: genId(),
      name,
      email,
      passwordHash: simpleHash(password),
      createdAt: new Date().toISOString(),
      courses: [],
      progress: {},
      streak: 0
    };

    db.users.push(user);
    writeDB(db);

    setSession(user);
    resolve({ ok: true, user: publicUser(user) });
  });
}

/**
 * Log in an existing user.
 * @returns {Promise<{ok:boolean, message?:string, user?:object}>}
 */
function loginUser({ email, password }) {
  return new Promise((resolve) => {
    email = (email || "").trim().toLowerCase();
    const db = readDB();
    const user = db.users.find((u) => u.email === email);

    if (!user || user.passwordHash !== simpleHash(password)) {
      return resolve({ ok: false, message: "Invalid email or password." });
    }

    setSession(user);
    resolve({ ok: true, user: publicUser(user) });
  });
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

function setSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ uid: user.uid, name: user.name, email: user.email })
  );
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function getCurrentUserFull() {
  const session = getSession();
  if (!session) return null;
  const db = readDB();
  return db.users.find((u) => u.uid === session.uid) || null;
}

function updateCurrentUser(patch) {
  const session = getSession();
  if (!session) return null;
  const db = readDB();
  const idx = db.users.findIndex((u) => u.uid === session.uid);
  if (idx === -1) return null;
  db.users[idx] = { ...db.users[idx], ...patch };
  writeDB(db);
  return publicUser(db.users[idx]);
}

function publicUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

/**
 * Call this at the top of any protected page (e.g. dashboard.html).
 * Redirects to login.html if nobody is logged in.
 */
function requireAuth(redirectTo = "login.html") {
  const session = getSession();
  if (!session) {
    window.location.href = redirectTo;
    return null;
  }
  return session;
}

// Expose globally since these pages use plain <script> tags, not modules
window.EduNovaAuth = {
  registerUser,
  loginUser,
  logoutUser,
  getSession,
  getCurrentUserFull,
  updateCurrentUser,
  requireAuth
};
