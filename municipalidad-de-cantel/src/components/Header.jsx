

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [escudoMunicipal, setEscudoMunicipal] = useState(null);  // Estado para almacenar el escudo municipal

  // Obtener las imágenes del escudo municipal desde la API
  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/inicio/')  // Asegúrate de que esta URL sea correcta
      .then(response => {
        const escudo = response.data.imagenes_escudo.length > 0 ? response.data.imagenes_escudo[0].imagen : null;
        setEscudoMunicipal(escudo);
      })
      .catch(error => {
        console.error('Error al obtener el escudo municipal:', error);
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubMenuClick = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };

  const handleLinkClick = () => {
    setActiveSubMenu(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo (escudo) con enlace al login de admin */}
        <div className="flex items-center relative z-10">
          {escudoMunicipal ? (
            <a href="https://muni-backend.onrender.com/admin/"> 
              <img
                src={`https://muni-backend.onrender.com${escudoMunicipal}`}  // Mostrar el escudo municipal subido
                alt="Escudo Municipal de Cantel"
                className="h-25 w-16 cursor-pointer"
              />
            </a>
          ) : (
            <a href="/admin"> {/* Enlace al login de admin */}
              <img
                //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65AfDO2UncaJwDkmw3JMcibXIuR7PbHgv5g&s"
                alt="Municipalidad de Cantel"
                className="h-25 w-16 cursor-pointer"
              />
            </a>
          )}
          <div className="text-lg font-bold ml-2">
            <p>MUNICIPALIDAD DE</p>
            <p>CANTEL</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 relative z-20">
          <Link to="/" className="hover:text-blue-600" onClick={handleLinkClick}>Inicio</Link>
          <div className="relative">
            <button onClick={() => handleSubMenuClick('municipalidad')} className="hover:text-blue-600">
              Municipalidad
            </button>
            {activeSubMenu === 'municipalidad' && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-30 border border-gray-200">
                <Link to="/corporacion-actual" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={handleLinkClick}>Corporación Actual</Link>
                <Link to="/historia-cantel" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg" onClick={handleLinkClick}>Historia de Cantel</Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => handleSubMenuClick('noticias')} className="hover:text-blue-600">
              Noticias y Eventos
            </button>
            {activeSubMenu === 'noticias' && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-30 border border-gray-200">
                <Link to="/noticias" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={handleLinkClick}>Noticias</Link>
                <Link to="/eventos" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg" onClick={handleLinkClick}>Eventos</Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => handleSubMenuClick('turismo')} className="hover:text-blue-600">
              Turismo y Cultura
            </button>
            {activeSubMenu === 'turismo' && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-30 border border-gray-200">
                <Link to="/turismo" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={handleLinkClick}>Turismo</Link>
                <Link to="/cultura" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Cultura</Link>
                <Link to="/gastronomia" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Gastronomía</Link>
                <Link to="/hospedajes" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Hospedajes</Link>
                <Link to="/gasolineras" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg" onClick={handleLinkClick}>Gasolineras</Link>
              </div>
            )}
          </div>

          {/* Enlace de Transparencia que abre en una nueva pestaña */}
          <a
            href="https://municipalidadcantel.laip.gt"  // Cambia esta URL por la correcta
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            Transparencia
          </a>
          
          <Link to="/participacion-ciudadana" className="hover:text-blue-600" onClick={handleLinkClick}>Participación Ciudadana</Link>
          <div className="relative">
            <button onClick={() => handleSubMenuClick('tramites')} className="hover:text-blue-600">
              Trámites y Servicios
            </button>
            {activeSubMenu === 'tramites' && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-30 border border-gray-200">
                <Link to="/tramites" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={handleLinkClick}>Trámites</Link>
                <Link to="/servicios" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg" onClick={handleLinkClick}>Servicios</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-4 py-2 border rounded text-gray-600 border-gray-600 hover:text-gray-800 hover:border-gray-800"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="bg-white shadow-md">
            <ul className="flex flex-col space-y-2 p-4">
              <li><Link to="/" className="block text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Inicio</Link></li>
              <li>
                <button onClick={() => handleSubMenuClick('municipalidad')} className="block text-lg hover:bg-gray-200 p-2 rounded">
                  Municipalidad
                </button>
                {activeSubMenu === 'municipalidad' && (
                  <ul className="pl-4 bg-white shadow-lg rounded-lg border border-gray-200">
                    <li><Link to="/corporacion-actual" className="block hover:bg-gray-200 p-2 rounded-t-lg" onClick={handleLinkClick}>Corporación Actual</Link></li>
                    <li><Link to="/historia-cantel" className="block hover:bg-gray-200 p-2 rounded-b-lg" onClick={handleLinkClick}>Historia de Cantel</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={() => handleSubMenuClick('noticias')} className="block text-lg hover:bg-gray-200 p-2 rounded">
                  Noticias y Eventos
                </button>
                {activeSubMenu === 'noticias' && (
                  <ul className="pl-4 bg-white shadow-lg rounded-lg border border-gray-200">
                    <li><Link to="/noticias" className="block hover:bg-gray-200 p-2 rounded-t-lg" onClick={handleLinkClick}>Noticias</Link></li>
                    <li><Link to="/eventos" className="block hover:bg-gray-200 p-2 rounded-b-lg" onClick={handleLinkClick}>Eventos</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={() => handleSubMenuClick('turismo')} className="block text-lg hover:bg-gray-200 p-2 rounded">
                  Turismo y Cultura
                </button>
                {activeSubMenu === 'turismo' && (
                  <ul className="pl-4 bg-white shadow-lg rounded-lg border border-gray-200">
                    <li><Link to="/turismo" className="block hover:bg-gray-200 p-2 rounded-t-lg" onClick={handleLinkClick}>Turismo</Link></li>
                    <li><Link to="/cultura" className="block hover:bg-gray-200 p-2" onClick={handleLinkClick}>Cultura</Link></li>
                    <li><Link to="/gastronomia" className="block hover:bg-gray-200 p-2" onClick={handleLinkClick}>Gastronomía</Link></li>
                    <li><Link to="/hospedajes" className="block hover:bg-gray-200 p-2" onClick={handleLinkClick}>Hospedajes</Link></li>
                    <li><Link to="/gasolineras" className="block hover:bg-gray-200 p-2 rounded-b-lg" onClick={handleLinkClick}>Gasolineras</Link></li>
                  </ul>
                )}
              </li>

              {/* Enlace de Transparencia en móvil */}
              <li>
                <a
                  href="https://municipalidadcantel.laip.gt"  // Cambia esta URL por la correcta
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg hover:bg-gray-200 p-2 rounded"
                >
                  Transparencia
                </a>
              </li>

              <li><Link to="/participacion-ciudadana" className="block text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Participación Ciudadana</Link></li>
              <li>
                <button onClick={() => handleSubMenuClick('tramites')} className="block text-lg hover:bg-gray-200 p-2 rounded">
                  Trámites y Servicios
                </button>
                {activeSubMenu === 'tramites' && (
                  <ul className="pl-4 bg-white shadow-lg rounded-lg border border-gray-200">
                    <li><Link to="/tramites" className="block hover:bg-gray-200 p-2 rounded-t-lg" onClick={handleLinkClick}>Trámites</Link></li>
                    <li><Link to="/servicios" className="block hover:bg-gray-200 p-2 rounded-b-lg" onClick={handleLinkClick}>Servicios</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
