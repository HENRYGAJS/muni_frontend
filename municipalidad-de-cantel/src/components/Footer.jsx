import React from 'react';
import { FaFacebook, FaInstagram, } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© 2024 Municipalidad de Cantel. Todos los derechos reservados.</p>
        
        {/* Redes Sociales */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.facebook.com/p/Municipalidad-de-Cantel-Administraci%C3%B3n-2024-2028-61555813043886/?locale=es_LA" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="text-white hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
        
          <a href="https://www.instagram.com/muni_cantel/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="text-white hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          
        </div>
        
        {/* Número de Teléfono */}
        <div className="mt-4">
          <a href="tel:+1234567890" className="text-white hover:text-gray-400">
            <span className="text-lg">Llamar al: 7763 4044</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
