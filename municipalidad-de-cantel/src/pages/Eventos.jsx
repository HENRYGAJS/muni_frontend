import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    axios.get('https://muni-backend.onrender.com/api/eventos/')  // Asegúrate de que esta URL sea correcta
      .then(response => {
        setEventos(response.data);  // Guardamos los eventos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los eventos:', error);
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
      <h2 className="text-2xl font-bold mb-8">Próximos Eventos</h2>

      {/* Mostrar los eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eventos.map((evento) => (
          <div key={evento.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            
            {/* Imagen del evento */}
            <div className="md:w-1/2">
              {evento.imagenes && evento.imagenes.length > 0 && (
                <img
                  
                  src={evento.imagenes[0].imagen}   // Eliminar 'media/' del inicio
              
                  alt={evento.titulo}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(evento.imagenes, 0)}  // Abre el modal al hacer clic en la imagen
                />
              )}
            </div>

            {/* Detalles del evento */}
            <div className="p-4 md:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{evento.titulo}</h3>
                <p className="text-gray-700 mb-2">{evento.descripcion}</p>
                <p className="text-gray-500">Fecha del evento: {evento.fecha_evento}</p>
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
              src={currentImages[currentImageIndex].imagen} // Eliminar 'media/' del inicio
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

export default Eventos;
