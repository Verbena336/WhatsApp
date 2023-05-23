import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../Login';
import Chat from '../Chat';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
      <Route path="/*" element={<div>404</div>}></Route>
    </Routes>
  );
}

export default AppRoutes;
