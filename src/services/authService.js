import MOCK_USERS from "../mockdata/mock_users";

const REGISTERED_USERS_KEY = "registeredUsers";
const LOGGED_IN_USER_KEY = "loggedInUser";

const mapUserShape = (user) => ({
  uid: String(user.id ?? Date.now()),
  displayName: user.name,
  name: user.name,
  email: user.email,
  cellphone: user.cellphone ?? "",
  address: user.address ?? "",
  emailVerified: true,
});

const getRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY) || "null");
  } catch {
    return null;
  }
};

const notifyAuthChange = () => {
  window.dispatchEvent(new Event("template-auth-change"));
};

export const subscribeToAuthChanges = (callback) => {
  const handler = () => callback(getCurrentUser());
  handler();
  window.addEventListener("storage", handler);
  window.addEventListener("template-auth-change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("template-auth-change", handler);
  };
};

export const loginUser = async (email, password) => {
  // Nota Técnica: Aquí se implementaría la validación contra un backend JWT
  // ej. const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  const registeredUsers = getRegisteredUsers();
  const allUsers = [...MOCK_USERS, ...registeredUsers];
  const foundUser = allUsers.find(
    (user) => user.email === email && user.password === password,
  );

  if (!foundUser) {
    return { success: false, error: "Correo o contraseña incorrectos" };
  }

  const normalizedUser = mapUserShape(foundUser);
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(normalizedUser));
  notifyAuthChange();

  return { success: true, user: normalizedUser };
};

export const registerFullUser = async (userData) => {
  if (!userData.name || userData.name.trim().length === 0) {
    return { success: false, error: "El nombre es obligatorio." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    return { success: false, error: "El formato del email es inválido." };
  }

  if (!userData.password || userData.password.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const registeredUsers = getRegisteredUsers();
  const allUsers = [...MOCK_USERS, ...registeredUsers];
  const emailExists = allUsers.some(
    (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
  );

  if (emailExists) {
    return { success: false, error: "El email ya está registrado." };
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    cellphone: userData.cellphone ?? "",
    address: userData.address ?? "",
    password: userData.password,
  };

  localStorage.setItem(
    REGISTERED_USERS_KEY,
    JSON.stringify([...registeredUsers, newUser]),
  );

  return { success: true, user: mapUserShape(newUser) };
};

export const logoutUser = async () => {
  // Nota Técnica: Si se usara backend real, aquí se invalidaría el token/sesión en el servidor
  // ej. await fetch('/api/logout', { method: 'POST' })
  localStorage.removeItem(LOGGED_IN_USER_KEY);
  notifyAuthChange();
  return { success: true };
};
