import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const authProvider = (type, params) => {
  // Called when the user attempt to log in
  if (type === AUTH_LOGIN) {
    const { username } = params;
    localStorage.setItem('username', username);
    // Accepts all username/password combinations
    return Promise.resolve();
  }

  // Called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('username');
    return Promise.resolve();
  }

  // Called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  }

  // Called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem('username')
      ? Promise.resolve()
      : Promise.reject();
  }

  return Promise.reject('Unknown method');
};

export default authProvider;
