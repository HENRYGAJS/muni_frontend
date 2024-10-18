import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Eventos from './pages/Eventos';
import Turismo from './pages/Turismo';
import Transparencia from './pages/Transparencia';
import ParticipacionCiudadana from './pages/ParticipacionCiudadana';
import HistoriaCantel from './pages/HistoriaCantel';
import CorporacionActual from './pages/CorporacionActual';
import Noticias from './pages/Noticias';
import Cultura from './pages/Cultura';
import Gastronomia from './pages/Gastronomia';
import Hospedaje from './pages/Hospedaje';
import Gasolineras from './pages/Gasolineras';
import Servicios from './pages/Servicios';
import Tramites from './pages/Tramites';

function App() {
  return (
    <Router>
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/corporacion-actual" element={<CorporacionActual />} />
          <Route path="/historia-cantel" element={<HistoriaCantel />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/turismo" element={<Turismo />} />
          <Route path="/cultura" element={<Cultura/>} />
          <Route path="/gastronomia" element={<Gastronomia/>}/>
          <Route path="/hospedajes" element={<Hospedaje/>}/>
          <Route path="/gasolineras" element={<Gasolineras/>}/>
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/participacion-ciudadana" element={<ParticipacionCiudadana />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/servicios" element={<Servicios />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
