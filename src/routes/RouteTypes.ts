import { URL } from '../constants';
import { Dashboard, Login } from '../pages';

export const publicRoutes = [{ path: URL.Login, Component: Login }];
export const privateRoutes = [{ path: URL.Dashboard, Component: Dashboard }];
