import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-100 py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-pink-700 mb-2">¡Gracias por ser parte de este momento tan especial!</h2>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-pink-500 mb-2" />
              <h3 className="font-bold text-purple-800 mb-1">Fecha</h3>
              <p className="text-purple-600">15 de Junio, 2025</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Clock className="h-8 w-8 text-pink-500 mb-2" />
              <h3 className="font-bold text-purple-800 mb-1">Hora</h3>
              <p className="text-purple-600">16:00 - 20:00 hrs</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-8 w-8 text-pink-500 mb-2" />
              <h3 className="font-bold text-purple-800 mb-1">Lugar</h3>
              <p className="text-purple-600">Salón de Eventos "El Jardín"</p>
              <p className="text-purple-600 text-sm">Av. Primavera 123, Ciudad</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-purple-600 text-sm">
          <p>© 2025 - Baby Shower de Isabella</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;