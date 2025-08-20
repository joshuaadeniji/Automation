import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Sidebar from './components/Sidebar'
import Navigation from './components/Navigation'

import './App.css'
import { AuthProvider } from './utils/AuthContext'
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="super-container">
          <div className="navigation-container">
            <Navigation />
          </div>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="main-container">
                    <div className="sidebar-container">
                      <Sidebar />
                    </div>
                    <div className="pages-container">
                      <Home />
                    </div>
                    <div className="aside-container">
                      {/* Additional content can go here */}
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <div className="main-container">
                    <div className="sidebar-container">
                      <Sidebar />
                    </div>
                    <div className="pages-container">
                      <Notes />
                    </div>
                    <div className="aside-container">
                      {/* Additional content can go here */}
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
