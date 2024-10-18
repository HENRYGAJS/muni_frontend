import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function ParticipacionCiudadana() {
  const [selectedCoord, setSelectedCoord] = useState({ lat: center.lat, lng: center.lng });
  const [map, setMap] = useState(null);
  const [link, setLink] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const onMapClick = useCallback((e) => {
    const newCoord = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setSelectedCoord(newCoord);
    generateLink(newCoord);
  }, []);

  const generateLink = (coord) => {
    const linkUrl = `https://www.google.com/maps?q=${coord.lat},${coord.lng}`;
    setLink(linkUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar correo y teléfono
    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      alert('Correo electrónico no válido');
      return;
    }
    if (!/^\d{8,15}$/.test(formData.telefono)) {
      alert('Número telefónico no válido');
      return;
    }

    const data = {
      ...formData,
      enlace_ubicacion: link,
      latitud: selectedCoord.lat,
      longitud: selectedCoord.lng,
    };

    // Conexión al backend
    axios.post('http://127.0.0.1:8000/api/crear_reporte/', data)
      .then((response) => {
        alert('Reporte enviado correctamente');
        setFormData({ nombre: "", correo: "", telefono: "", asunto: "", mensaje: "" });
      })
      .catch((error) => {
        console.error('Error al enviar el reporte:', error);
        alert('Hubo un error al enviar el reporte');
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedCoord(userCoord);
          if (map) {
            map.panTo(userCoord);
          }
          generateLink(userCoord);
        },
        () => {
          alert('Error al obtener la ubicación.');
        }
      );
    } else {
      alert('Geolocalización no soportada por este navegador.');
    }
  };

  const handleMarkPlace = () => {
    if (map) {
      map.panTo(selectedCoord);
    }
    generateLink(selectedCoord);
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 bg-white rounded-xl shadow-lg space-y-8 lg:space-y-0 lg:space-x-8">
      <div className="lg:w-3/5 p-6 bg-gray-50 rounded-lg shadow-inner">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Reporte de Fallos</h1>
        <p className="text-lg text-gray-600 italic mb-6">Por favor, completa el formulario para enviarnos un reporte.</p>
        <p className="text-lg text-gray-600 italic mb-6">Si usted se encuentra en el lugar del incidente selecione "Usar mi Ubicacion Actual".</p>
        <p className="text-lg text-gray-600 italic mb-6">Si no se encuentra en el lugar del incidente, use el mapa y la opción "Marcar en el Mapa" para marcar la ubicación del incidente.</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Seleccionar Dirección de Incidente</h2>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Latitud: {selectedCoord.lat}</p>
            <p className="text-sm text-gray-600">Longitud: {selectedCoord.lng}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 inline-block">Ver ubicación en Google Maps</a>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={locateUser}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Usar mi Ubicación Actual
            </button>
            <button
              onClick={handleMarkPlace}
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Marcar Lugar en el Mapa
            </button>
          </div>
        </div>
        <div className="h-96">
          <LoadScript googleMapsApiKey="AIzaSyAxb327D_rmO4z3k9qnFUm96u0HDQcG6A8">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedCoord}
              zoom={15}
              onClick={onMapClick}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={selectedCoord} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <div className="lg:w-2/5 bg-gray-100 p-6 rounded-lg shadow-inner">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            className="w-full p-3 bg-gray-200 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 bg-gray-200 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 bg-gray-200 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número Telefónico"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <select
            className="w-full p-3 bg-gray-200 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un asunto</option>
            <option value="calle">Calle en mal estado</option>
            <option value="alumbrado">Alumbrado público</option>
            <option value="drenaje">Daño a drenaje</option>
            <option value="tuberia">Daño a tubería de agua</option>
            <option value="otros">Otros</option>
          </select>
          <textarea
            className="w-full p-3 bg-gray-200 border-none rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
          <input
            className="w-full p-3 bg-gray-200 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enlace de la Ubicación"
            value={link}
            readOnly
          />
          <button
            className="w-full p-3 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 transition duration-300 ease-in-out"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ParticipacionCiudadana;
