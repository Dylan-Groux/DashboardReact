import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login from './Login';
import './App.css'
import Dashboard from './Dashboard';
import Logout from './Logout/Logout';
import { AuthProvider } from './context/AuthContext';
import { ApiClientProvider } from './context/ApiClientContext';
import { UserProvider } from './context/UserContext';
import AuthGuard from './components/Guard';
import { ApiUrlContext } from './context/ApiUrlContext';
import Profile from './Profile';
import { ErrorProvider } from './context/ErrorContext';
import ErrorPage from './components/ErrorPage';
import NotFoundRedirect from './components/ErrorPage/NotFoundRedirect';

const ProtectedApp = () => {
  return (
    <AuthGuard>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </AuthGuard>
  );
};

function App() {
  return (
    <ApiUrlContext.Provider value={import.meta.env.VITE_API_URL}>
      <AuthProvider>
        <BrowserRouter>
          <ErrorProvider>
            <ApiClientProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/error" element={<ErrorPage />} />

                <Route element={<ProtectedApp />}>
                  <Route path="/dashboard/:id" element={<Dashboard />} />
                  <Route path="/profil/:id" element={<Profile />} />
                  <Route path="/logout" element={<Logout />} />
                </Route>

                <Route path="*" element={<NotFoundRedirect />} />
              </Routes>
            </ApiClientProvider>
          </ErrorProvider>
        </BrowserRouter>
      </AuthProvider>
    </ApiUrlContext.Provider>
  );
}

export default App
