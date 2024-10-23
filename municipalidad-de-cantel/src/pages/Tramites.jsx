import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tramites = () => {
  const [tramites, setTramites] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Índice de la imagen seleccionada
  const [selectedTramite, setSelectedTramite] = useState(null); // Trámite actual en el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/tramites/')
      .then((response) => {
        setTramites(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los trámites:', error);
      });
  }, []);

  const openModal = (tramite, index) => {
    setSelectedTramite(tramite);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    setSelectedTramite(null);
  };

  const handleNextImage = () => {
    if (selectedTramite) {
      const totalImages = selectedTramite.imagenes.length;
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">TRÁMITES</h2>
        <p className="text-center text-gray-600 mb-12">
          Consulta los trámites disponibles y descarga los archivos requeridos.
        </p>

        <div className="relative flex flex-wrap justify-center space-x-4">
          {tramites.map((tramite) => (
            <div key={tramite.id} className="bg-white rounded-lg shadow-md w-full md:w-1/3 p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">{tramite.nombre}</h3>
              <p className="text-sm text-gray-600 mb-4 ">{tramite.descripcion}</p>
              {tramite.imagenes.length > 0 && (
                <img
                  src={`https://municipalidad-cantel-media.s3.us-east-2.amazonaws.com${tramite.imagenes[0].imagen.replace('media/', '')}`}
                  alt={tramite.nombre}
                  className="w-full h-40 object-cover cursor-pointer"
                  onClick={() => openModal(tramite, 0)} // Abrir modal con la primera imagen
                />
              )}
              <div className="mt-4">
                <h4 className="text-md font-semibold">Archivos disponibles:</h4>
                <ul className="list-disc pl-5">
                  {tramite.archivos.map((archivo, index) => (
                    <li key={index}>
                      <a
                        href={`https://municipalidad-cantel-media.s3.us-east-2.amazonaws.com${archivo.archivo.replace('media/', '')}`}
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
        {isModalOpen && selectedTramite && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg">
              <img
                src={`https://municipalidad-cantel-media.s3.us-east-2.amazonaws.com${selectedTramite.imagenes[selectedImageIndex].imagen.replace('media/', '')}`}
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

export default Tramites;
