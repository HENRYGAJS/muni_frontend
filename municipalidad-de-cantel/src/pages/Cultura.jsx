import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cultura = () => {
  const [eventos, setEventos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Para almacenar la imagen seleccionada para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);    // Para controlar la visibilidad del modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen mostrada en el modal
  const [currentEvento, setCurrentEvento] = useState(null);  // Para almacenar el evento cultural actual en el modal

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/eventos_culturales/')
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los eventos culturales:', error);
      });
  }, []);

  const openModal = (evento, imageIndex) => {
    setCurrentEvento(evento);       // Guardamos el evento seleccionado
    setCurrentImageIndex(imageIndex);  // Guardamos el índice de la imagen
    setSelectedImage(`https://muni-backend.onrender.com${evento.imagenes[imageIndex].imagen}`);
    setIsModalOpen(true);         // Mostramos el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);        // Cerramos el modal
    setSelectedImage(null);       // Limpiamos la imagen seleccionada
  };

  const handleModalImageClick = () => {
    if (currentEvento && currentEvento.imagenes.length > 0) {
      // Avanzamos a la siguiente imagen dentro del modal
      const nextImageIndex = (currentImageIndex + 1) % currentEvento.imagenes.length;
      setCurrentImageIndex(nextImageIndex);
      setSelectedImage(`https://muni-backend.onrender.com${currentEvento.imagenes[nextImageIndex].imagen}`);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">CULTURA</h2>
        <p className="text-center text-gray-600 mb-12">
          Descubre los eventos y lugares culturales más emblemáticos del Municipio de Cantel.
        </p>

        <div className="relative flex justify-center items-center">
          <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
            {eventos.map((evento, eventoIndex) => (
              <div key={eventoIndex} className="bg-white rounded-lg shadow-md min-w-[250px] md:min-w-[300px] overflow-hidden">
                {evento.imagenes.length > 0 && (
                  <img
                    src={`https://muni-backend.onrender.com${evento.imagenes[evento.currentImageIndex || 0].imagen}`}
                    alt={evento.nombre}
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => openModal(evento, evento.currentImageIndex || 0)}
                  />
                )}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{evento.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-4">{evento.descripcion}</p>
                  <Link
                    
                  >
                    
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal para mostrar la imagen en grande */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg">
              <img
                src={selectedImage}
                alt="Imagen ampliada"
                className="max-w-full max-h-[80vh] object-contain cursor-pointer"
                onClick={handleModalImageClick}  // Cambia la imagen al hacer clic
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-4 py-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ); 
};

export default Cultura;