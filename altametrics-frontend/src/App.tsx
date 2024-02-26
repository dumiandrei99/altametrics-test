import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import LoginPage from './components/pages/LoginPage';
import PublicRoute from './routes/PublicRoute';
import AuthenticatedApp from './AuthenticatedApp';
import ErrorPopup from './components/popups/ErrorPopup';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <ErrorPopup />
          <Routes>
            <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="*" element={<AuthenticatedApp />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};


export default App;