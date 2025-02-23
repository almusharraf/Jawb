const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_NAME_KEY = 'userName';
const USER_EMAIL_KEY = 'userEmail';
const USER_GAMES_KEY = 'userGames';

export const saveAuthData = (data: {
  access: string;
  refresh: string;
  first_name: string;
  email: string;
}): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
  localStorage.setItem(USER_NAME_KEY, data.first_name);
  localStorage.setItem(USER_EMAIL_KEY, data.email);
  // Removed default setting for userGames
};

export const getAuthData = (): {
  access: string | null;
  refresh: string | null;
  first_name: string | null;
  email: string | null;
  userGames: string | null;
} => {
  return {
    access: localStorage.getItem(ACCESS_TOKEN_KEY),
    refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
    first_name: localStorage.getItem(USER_NAME_KEY),
    email: localStorage.getItem(USER_EMAIL_KEY),
    userGames: localStorage.getItem(USER_GAMES_KEY),
  };
};

export const clearAuthData = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(USER_GAMES_KEY);
};
