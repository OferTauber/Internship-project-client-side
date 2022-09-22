import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import './style/colors.css';
import App from './components/App';
import Ports from './components/ports/ports';
import 'normalize.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import TempApp from './components/tempApp/tempApp';
import ProtectedRoute from './components/protected_route/protectedRoute';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/temp"
        element={
          <ProtectedRoute>
            <TempApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ports"
        element={
          <ProtectedRoute>
            <Ports />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
