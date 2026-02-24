import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import './App.css'
import Dashboard from './Dashboard';
import Logout from './Logout/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/profil/:id" element={"TODO : En dev"} />
        {/* Route à certainement rajouter même si non présent dans la maquette */}
        <Route path="/register" element={"TODO : Register"} />
        <Route path="/forgot-password" element={"TODO : Mot de passe oublié"} />
        <Route path="/terms" element={"TODO : CGU"} />
        <Route path="/contact" element={"TODO : Contact"} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
