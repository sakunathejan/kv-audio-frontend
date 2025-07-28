import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';
import LoginPage from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/register/register';
import AdminPage from './pages/admin/adminPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Toaster 
              position='top-right'
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white',
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
            <Routes path="/*">
              <Route path='/testing' element={<Testing/>}/>
              <Route path="/login" element={<LoginPage/>}/>         
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/admin/*" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPage/>
                </ProtectedRoute>
              }/>
              <Route path="/*" element={<HomePage/>}/> 
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
