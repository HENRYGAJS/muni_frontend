import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Turismo = () => {
  const [lugares, setLugares] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Para almacenar la imagen seleccionada para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);    // Para controlar la visibilidad del modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen mostrada en el modal
  const [currentLugar, setCurrentLugar] = useState(null);   // Para almacenar el lugar actual en el modal

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/lugares_turisticos/')
      .then((response) => {
        setLugares(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los lugares turísticos:', error);
      });
  }, []);

  //const handleImageClick = (index, lugarIndex) => {
    ///const lugar = lugares[lugarIndex];
    //const newIndex = (index + 1) % lugar.imagenes.length;
    //const updatedLugares = [...lugares];
    //updatedLugares[lugarIndex].currentImageIndex = newIndex;
    //setLugares(updatedLugares);
  //};

  const openModal = (lugar, imageIndex) => {
    setCurrentLugar(lugar);       // Guardamos el lugar seleccionado
    setCurrentImageIndex(imageIndex);  // Guardamos el índice de la imagen
    setSelectedImage(lugar.imagenes[imageIndex].imagen);
    setIsModalOpen(true);         // Mostramos el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);        // Cerramos el modal
    setSelectedImage(null);       // Limpiamos la imagen seleccionada
  };

  const handleModalImageClick = () => {
    if (currentLugar && currentLugar.imagenes.length > 0) {
      // Avanzamos a la siguiente imagen dentro del modal
      const nextImageIndex = (currentImageIndex + 1) % currentLugar.imagenes.length;
      setCurrentImageIndex(nextImageIndex);
      setSelectedImage(currentLugar.imagenes[nextImageIndex].imagen);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">TURISMO</h2>
        <p className="text-center text-gray-600 mb-12">
          Conoce los lugares más emblemáticos del Municipio de Cantel.  
        </p>
        <div className="relative flex justify-center items-center">
          <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
            {lugares.map((lugar, lugarIndex) => (
              <div key={lugarIndex} className="bg-white rounded-lg shadow-md min-w-[250px] md:min-w-[300px] overflow-hidden">
                {lugar.imagenes.length > 0 && (
                  <img
                    src={lugar.imagenes[lugar.currentImageIndex || 0].imagen}
                    alt={lugar.nombre}
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => openModal(lugar, lugar.currentImageIndex || 0)}
                  />
                )}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{lugar.nombre}</h3>
                  <p className="ext-md md:text-lg lg:text-xl text-gray-700 mt-4 whitespace-pre-line text-justify">{lugar.descripcion}</p>
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

export default Turismo;
