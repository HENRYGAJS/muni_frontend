import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CorporacionActual() {
  const [corporacion, setCorporacion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // Obtener la información de la API
  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/corporacion_actual/')
      .then(response => {
        console.log(response.data);  // Verificar que los datos se están recibiendo correctamente
        setCorporacion(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la corporación:', error);
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

  if (!corporacion) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {/* Imagen de encabezado */}
      {corporacion.imagenes && corporacion.imagenes.length > 0 && (
        <div className="relative">
          <img
            src={`https://muni-backend.onrender.com${corporacion.imagenes[0].imagen}`}  // Mostrar la primera imagen como encabezado
            alt="Municipalidad de Cantel"
            className="w-full h-auto object-cover mx-auto p-4 cursor-pointer"
            onClick={() => openModal(corporacion.imagenes, 0)}  // Abrir modal al hacer clic
          />
        </div>
      )}

      {/* Descripción de la corporación actual */}
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
            {corporacion.titulo}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mt-4">
            {corporacion.descripcion}
          </p>
        </div>

        {/* Sección de misión y visión */}
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8">
          {/* Misión */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-xl font-bold text-center text-gray-800">Misión</h3>
            <p className="text-md text-gray-700 mt-4 text-center">
              {corporacion.mision}
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h3 className="text-xl font-bold text-center text-gray-800">Visión</h3>
            <p className="text-md text-gray-700 mt-4 text-center">
              {corporacion.vision}
            </p>
          </div>
        </div>

        
      </div>

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

export default CorporacionActual;
