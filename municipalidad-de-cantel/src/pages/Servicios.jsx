import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Índice de la imagen seleccionada
  const [selectedServicio, setSelectedServicio] = useState(null); // Servicio actual en el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/servicios/')
      .then((response) => {
        setServicios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los servicios:', error);
      });
  }, []);

  const openModal = (servicio, index) => {
    setSelectedServicio(servicio);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    setSelectedServicio(null);
  };

  const handleNextImage = () => {
    if (selectedServicio) {
      const totalImages = selectedServicio.imagenes.length;
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">SERVICIOS</h2>
        <p className="text-center text-gray-600 mb-12">
          Consulta los servicios disponibles y descarga los archivos requeridos.
        </p>

        <div className="relative flex flex-wrap justify-center space-x-4">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="bg-white rounded-lg shadow-md w-full md:w-1/3 p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4 ">{servicio.nombre}</h3>
              <p className="text-md md:text-lg lg:text-xl text-gray-700 mt-4 whitespace-pre-line">{servicio.descripcion}</p>
              {servicio.imagenes.length > 0 && (
                <img
                  src={servicio.imagenes[0].imagen}
                  alt={servicio.nombre}
                  className="w-full h-40 object-cover cursor-pointer"
                  onClick={() => openModal(servicio, 0)} // Abrir modal con la primera imagen
                />
              )}
              <div className="mt-4">
                <h4 className="text-md font-semibold">Archivos disponibles:</h4>
                <ul className="list-disc pl-5">
                  {servicio.archivos.map((archivo, index) => (
                    <li key={index}>
                      <a
                        href={archivo.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Descargar archivo {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para ver imagen en grande */}
        {isModalOpen && selectedServicio && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg">
              <img
                src={selectedServicio.imagenes[selectedImageIndex].imagen}
                alt="Imagen ampliada"
                className="max-w-full max-h-[80vh] object-contain cursor-pointer"
                onClick={handleNextImage} // Cambiar a la siguiente imagen al hacer clic
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

export default Servicios;
