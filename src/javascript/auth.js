// EduNova · Demo authentication (localStorage-based)
//
// This is a client-side-only demo auth system — good enough for a student
// project / prototype, NOT secure enough for a real production site
// (passwords are stored in the browser, not hashed on a real server).
// See the README roadmap for how to replace this with real Firebase or
// Express + MongoDB auth later.

const EduNovaAuth = (() => {
  const USERS_KEY = 'edunova_users';
  const SESSION_KEY = 'edunova_session';

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function setSession(email) {
    localStorage.setItem(SESSION_KEY, email);
  }

  function registerUser({ name, email, password }) {
    if (!name || !email || !password) {
      return { ok: false, message: 'Please fill in every field.' };
    }
    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, message: 'An account with that email already exists.' };
    }
    users.push({ name, email, password });
    saveUsers(users);
    setSession(email);
    return { ok: true };
  }

  function loginUser({ email, password }) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return { ok: false, message: 'Incorrect email or password.' };
    }
    setSession(email);
    return { ok: true };
  }

  function getCurrentUserFull() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  function requireAuth() {
    const user = getCurrentUserFull();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }

  return { registerUser, loginUser, getCurrentUserFull, requireAuth, logout };
})();
