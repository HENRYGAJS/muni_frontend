import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Noticias = () => {
  const [todasNoticias, setTodasNoticias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/todas_noticias/')  // Asegúrate de que esta ruta sea correcta
      .then(response => {
        setTodasNoticias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las noticias:', error);
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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8">Todas las Noticias</h2>

      {/* Contenedor de noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {todasNoticias.map((noticia) => (
          <div key={noticia.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            
            {/* Imagen de la noticia */}
            <div className="md:w-1/2">
              {noticia.imagenes && noticia.imagenes.length > 0 && (
                <img
                
                  src={noticia.imagenes[0].imagen}  // Mostrar la primera imagen
                  alt={noticia.titulo}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(noticia.imagenes, 0)}  // Abre el modal al hacer clic en la imagen
                />
              )}
            </div>

            {/* Detalles de la noticia */}
            <div className="p-4 md:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{noticia.titulo}</h3>
                <p className="text-md md:text-lg lg:text-xl text-gray-700 mt-4 whitespace-pre-line">{noticia.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para mostrar la imagen en grande */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={currentImages[currentImageIndex].imagen}
              alt="Imagen ampliada"
              className="max-w-full max-h-[80vh] object-contain cursor-pointer mb-4"
              onClick={handleNextImage}  // Al hacer clic en la imagen, se cambia a la siguiente
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
};

export default Noticias;
