import { Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import InvoicePage from './components/pages/InvoicePage';
import ProtectedRoute from './routes/ProtectedRoute';
import Sidebar from './components/Sidebar';
import './App.css';

const AuthenticatedApp: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="content-with-sidebar">
        <Routes>
          <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
