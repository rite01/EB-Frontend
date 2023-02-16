import '../App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CustomDialog, CustomModal } from '../components';
import { Toaster } from '../components/Toaster';
import { Login } from '../pages/Login';
import { PrivateRoutes } from './PrivateRoutes/privateRoutes';
import { PublicRoutes } from './PublicRoutes/publicRoutes';
import { privateRoutes, publicRoutes } from './RouteTypes';

const Routing = () => {
  return (
    <Router>
      <CustomDialog />
      <CustomModal />
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        {publicRoutes?.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={index}
              element={<PublicRoutes Component={route.Component} />}
            />
          );
        })}
        {privateRoutes?.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={index}
              element={<PrivateRoutes Component={route.Component} />}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default Routing;
