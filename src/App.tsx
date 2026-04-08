import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ApiUrlContext.Provider value={import.meta.env.VITE_API_URL}>
      <AuthProvider>
        <BrowserRouter>
          <ErrorProvider>
            <ApiClientProvider>
              <UserProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route element={<AuthGuard />}>
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/profil/:id" element={<Profile />} />
                {/* Route à certainement rajouter même si non présent dans la maquette */}
                <Route path="/register" element={"TODO : Register"} />
                <Route path="/forgot-password" element={"TODO : Mot de passe oublié"} />
                <Route path="/terms" element={"TODO : CGU"} />
                <Route path="/contact" element={"TODO : Contact"} />
                <Route path="/logout" element={<Logout />} />
                </Route>
                <Route path="*" element={<NotFoundRedirect />} />
              </Routes>
              </UserProvider>
            </ApiClientProvider>
          </ErrorProvider>
        </BrowserRouter>
      </AuthProvider>
    </ApiUrlContext.Provider>
  );
}

export default App
