import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inicio = () => {
  const [inicioData, setInicioData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  
  // Estado para almacenar las noticias más recientes
  const [noticiasRecientes, setNoticiasRecientes] = useState([]);

  // Obtener los datos del inicio desde la API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/inicio/')  // Asegúrate de que la URL sea correcta
      .then(response => {
        setInicioData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del inicio:', error);
      });
  }, []);

  // Obtener las noticias más recientes desde la API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/noticias_recientes/')  // Petición para las noticias recientes
      .then(response => {
        setNoticiasRecientes(response.data);  // Guardamos las noticias en el estado
      })
      .catch(error => {
        console.error('Hubo un error al obtener las noticias recientes:', error);
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

  if (!inicioData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {/* Imagen de encabezado con texto */}
      <div className="relative">
        <img
          src={`http://127.0.0.1:8000${inicioData.imagenes_palacio[0].imagen}`}  // Mostrar la primera imagen del palacio
          alt="Municipalidad de Cantel"
          className="w-full h-[60vh] object-cover cursor-pointer"
          onClick={() => openModal(inicioData.imagenes_palacio, 0)}  // Abre el modal con las imágenes
        />
        <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black via-transparent to-transparent">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
            {inicioData.eslogan}  {/* Eslogan */}
          </h1>
          <p className="text-md md:text-lg lg:text-xl mt-1">
            {inicioData.administracion}  {/* Administración */}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div className="p-8 text-center">
        <p className="text-base md:text-lg lg:text-xl text-gray-800">
          {inicioData.descripcion}  {/* Descripción */}
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

        {/* Mostrar las 3 noticias más recientes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {noticiasRecientes.map((noticia, index) => (
            <div key={noticia.id} className="bg-white shadow-md rounded-lg p-4">
              {noticia.imagenes && noticia.imagenes.length > 0 && (
                <img
                  src={`http://127.0.0.1:8000${noticia.imagenes[0].imagen}`} // Mostrar la primera imagen directamente
                  alt={noticia.titulo}
                  className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                  onClick={() => openModal(noticia.imagenes, 0)}  // Abre el modal y pasa las imágenes
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

      {/* Modal para mostrar la imagen en grande */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={`http://127.0.0.1:8000${currentImages[currentImageIndex].imagen}`}
              alt="Imagen ampliada"
              className="max-w-full max-h-[80vh] object-contain cursor-pointer mb-4"
              onClick={handleNextImage}  // Cambia a la siguiente imagen al hacer clic
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
