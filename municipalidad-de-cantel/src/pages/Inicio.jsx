import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inicio = () => {
  const [inicioData, setInicioData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  
  const [noticiasRecientes, setNoticiasRecientes] = useState([]);

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/inicio/')
      .then(response => {
        setInicioData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del inicio:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/noticias_recientes/')
      .then(response => {
        setNoticiasRecientes(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las noticias recientes:', error);
      });
  }, []);

  const openModal = (imagenes, index) => {
    setCurrentImages(imagenes);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentImages.length;
    setCurrentImageIndex(nextIndex);
  };

  if (!inicioData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {/* Validación para asegurarse de que hay imágenes disponibles */}
      {inicioData.imagenes_palacio && inicioData.imagenes_palacio.length > 0 ? (
        <div className="relative">
          <img

            src={`https://municipalidad-cantel-media.s3.us-east-2.amazonaws.com${inicioData.imagenes_palacio[0].imagen.replace('media/', '')}`}  
            alt="Municipalidad de Cantel"
            className="w-full h-[60vh] object-cover cursor-pointer"
            onClick={() => openModal(inicioData.imagenes_palacio, 0)}  
          />
          <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black via-transparent to-transparent">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
              {inicioData.eslogan}
            </h1>
            <p className="text-md md:text-lg lg:text-xl mt-1">
              {inicioData.administracion}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <p>No hay imágenes disponibles del Palacio Municipal.</p>
        </div>
      )}



      
      {/* Descripción */}
      <div className="p-8 text-center">
        <p className="text-base md:text-lg lg:text-xl text-gray-800">
          {inicioData.descripcion}
        </p>
        
        <p className=" p-8 text-center text-md md:text-lg lg:text-xl mt-1">
          {inicioData.administracion}  {/* Administración */}
        </p>
        
      </div>

      {/* Sección de noticias importantes */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
            <p className="bg-gray-200 text-base md:text-lg font-bold py-2 px-6 rounded-full">
              NOTICIAS IMPORTANTES
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {noticiasRecientes.map((noticia, index) => (
            <div key={noticia.id} className="bg-white shadow-md rounded-lg p-4">
              {noticia.imagenes && noticia.imagenes.length > 0 && (
                <img
                  src={`https://municipalidad-cantel-media.s3.us-east-2.amazonaws.com${noticia.imagenes[0].imagen.replace('media/', '')}`} 
                  alt={noticia.titulo}
                  className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                  onClick={() => openModal(noticia.imagenes, 0)}  
                />
              )}
              <h3 className="text-lg font-bold mb-2">{noticia.titulo}</h3>
              <p className="text-md md:text-lg lg:text-xl text-gray-700 mt-4 whitespace-pre-line">
                {noticia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={`https://municipalidad-cantel-media.s3.us-east-2.amazonaws.com${currentImages[currentImageIndex].imagen.replace('media/', '')}`} // Eliminar 'media/' del inicio
              alt="Imagen ampliada"
              className="max-w-full max-h-[80vh] object-contain cursor-pointer mb-4"
              onClick={handleNextImage}
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

export default Inicio;
