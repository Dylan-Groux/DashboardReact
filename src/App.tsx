import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login from './Login';
import './App.css'
import Dashboard from './Dashboard';
import Logout from './Logout/Logout';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import RequireAuth from './context/RequireAuth';
import { ApiUrlContext } from './context/ApiUrlContext';
import Profile from './Profile';

function App() {
  return (
    <ApiUrlContext.Provider value={import.meta.env.VITE_API_URL}>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<RequireAuth><Outlet /></RequireAuth>}>
              <Route path="/dashboard/:id" element={<Dashboard />} />
              <Route path="/profil/:id" element={<Profile />} />
              {/* Route à certainement rajouter même si non présent dans la maquette */}
              <Route path="/register" element={"TODO : Register"} />
              <Route path="/forgot-password" element={"TODO : Mot de passe oublié"} />
              <Route path="/terms" element={"TODO : CGU"} />
              <Route path="/contact" element={"TODO : Contact"} />
              <Route path="/logout" element={<Logout />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </ApiUrlContext.Provider>
  );
}

export default App
