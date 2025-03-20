import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { ShoppingState } from './context/shopping/shoppingState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ShoppingState>
        <App />
      </ShoppingState>
    </AuthContextProvider>
  </React.StrictMode>
);


