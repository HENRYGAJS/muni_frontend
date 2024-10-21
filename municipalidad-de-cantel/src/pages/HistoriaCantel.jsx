import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HistoriaCantel() {
  const [historias, setHistorias] = useState([]);  // Cambiado para manejar una lista de historias
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // Obtener la información de la API
  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/historia_cantel/')  // Asegúrate de que esta URL esté correcta
      .then(response => {
        console.log(response.data);  // Verificar que los datos se están recibiendo correctamente
        setHistorias(response.data);  // Guardar todas las historias
      })
      .catch(error => {
        console.error('Error al obtener las historias:', error);
      });
  }, []);

  // Función para abrir el modal y mostrar la primera imagen
  const openModal = (imagenes, index) => {
    setCurrentImages(imagenes);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para avanzar a la siguiente imagen
  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentImages.length;
    setCurrentImageIndex(nextIndex);
  };

  if (historias.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {historias.map((historia, index) => (
        <div key={index}>
          {/* Imagen de encabezado */}
          {historia.imagenes && historia.imagenes.length > 0 && (
            <div className="relative">
              <img
                src={`https://muni-backend.onrender.com${historia.imagenes[0].imagen}`}  // Mostrar la primera imagen como encabezado
                alt="Historia de Cantel"
                className="w-full h-auto object-cover mx-auto p-4 cursor-pointer"
                onClick={() => openModal(historia.imagenes, 0)}  // Abrir modal al hacer clic
              />
            </div>
          )}

          {/* Descripción de la historia */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
                {historia.titulo}
              </h2>
              <h3 className="text-lg md:text-xl lg:text-2xl text-gray-700 mt-2">
                {historia.subtitulo}
              </h3>
              <p className="text-md md:text-lg lg:text-xl text-gray-700 mt-4 whitespace-pre-line text-justify">
                {historia.descripcion}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Modal para mostrar la imagen en grande */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={`https://muni-backend.onrender.com${currentImages[currentImageIndex].imagen}`}
              alt="Imagen ampliada"
              className="max-w-full max-h-[80vh] object-contain cursor-pointer mb-4"
              onClick={handleNextImage}  // Cambiar a la siguiente imagen
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
  );
}

export default HistoriaCantel;
