
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { SignIn } from './pages/SignIn/SignIn';
import { Photos } from './pages/Photos/Photos';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Redirect root to sign in */}
            <Route path="/" element={<SignIn />} />
            
            {/* Protected photos route */}
            <Route 
              path="/photos" 
              element={
                <ProtectedRoute>
                  <Photos />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all other routes and redirect to sign in */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
