import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAuthenticated } from '../../utils';

interface IProps {
  Component: React.FC;
}

export const PrivateRoutes: React.FC<IProps> = ({ Component }): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, []);
  return <Component />;
};
