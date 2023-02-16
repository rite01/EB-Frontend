import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { URL } from '../../constants';
import { isAuthenticated } from '../../utils';

interface IProps {
  Component: React.FC;
}

// eslint-disable-next-line react/prop-types
export const PublicRoutes: React.FC<IProps> = ({ Component }): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isAuthenticated() && pathname === URL.Dashboard) {
      navigate('/');
    }
  }, []);
  return <Component />;
};
