import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
       

        {/* Sección de autoría y logo de la universidad */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/1/15/Escudo_de_la_universidad_Mariano_G%C3%A1lvez_Guatemala.svg" 
            alt="Logo de la Universidad" 
            className="h-8" // Ajusta el tamaño según sea necesario
          />
          <p>Desarrollado por Henry Ulises Garcia Ajsac</p>
          
        </div>
        <div className="mt-4 flex justify-center items-center space-x-2">
        <p>En colaboración con Universidad Mariano Galvez de Guatemala</p>

        </div>

        <div className="mt-4 flex justify-center items-center space-x-2" >

        <p>© 2024 Municipalidad de Cantel. Todos los derechos reservados.</p>

        </div>

        {/* Redes Sociales */}
        
        <p className="mt-5">Síguenos en nuestra redes oficiales</p>
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
          <a href="tel:77634044" className="text-white hover:text-gray-400">
            <span className="text-lg">Contacto: 7763 4044</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
