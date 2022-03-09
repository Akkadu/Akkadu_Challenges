import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './containers/home/Home';
import Signin from './containers/signin/Signin';
import Signup from './containers/signup/Signup';
import NoMatchedRoute from './containers/NonMatch';
import { APPLICATION_ROUTES } from './Constants';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={APPLICATION_ROUTES.ROOT} element={<Home />} />
      <Route path={APPLICATION_ROUTES.SIGNUP} element={<Signup />} />
      <Route path={APPLICATION_ROUTES.SIGNIN} element={<Signin />} />
      <Route path="*" element={<NoMatchedRoute />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
