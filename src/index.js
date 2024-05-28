import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserLoginStore from './contexts/userLoginStore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserLoginStore>
      <App />
    </UserLoginStore>
  </React.StrictMode>
);
