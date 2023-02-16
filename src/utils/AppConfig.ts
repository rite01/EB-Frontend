import Cookies from 'js-cookie';

export const AppConfig = {
  siteName: 'Birthday Reminder',
  locale: 'en',
  title: 'Description',
  tokenKey: 'token',
  paths: {
    // BASE: process.env.REACT_APP_BASE_URL!,
    // WEBSITE_URL: process.env.REACT_APP_BASE_URL!,
  },
};

export const isAuthenticated = () => {
  const authToken = Cookies.get('token');
  if (!authToken) {
    return false;
  }
  return true;
};
