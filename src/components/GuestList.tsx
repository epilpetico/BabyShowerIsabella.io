import React, { useState } from 'react';
import { Search, UserCheck, UserX, RefreshCw } from 'lucide-react';

interface Guest {
  id: number;
  name: string;
  confirmed: boolean;
}

interface GuestListProps {
  guests: Guest[];
  onConfirm: (id: number) => void;
  onSearch: (term: string) => void;
  searchTerm: string;
  isConnected: boolean;
}

const GuestList: React.FC<GuestListProps> = ({ 
  guests, 
  onConfirm, 
  onSearch, 
  searchTerm,
  isConnected 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 10;
  
  // Calculate pagination
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);
  const totalPages = Math.ceil(guests.length / guestsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded-b-3xl rounded-tr-3xl p-6 shadow-md animate-slideUp">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-pink-700">Nuestros Invitados Especiales</h2>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar invitado..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 w-full"
            />
            <Search className="absolute left-3 top-2.5 text-purple-400 h-5 w-5" />
          </div>
          <div className={`ml-3 ${isConnected ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {isConnected ? (
              <UserCheck className="h-5 w-5" />
            ) : (
              <RefreshCw className="h-5 w-5 animate-spin" />
            )}
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-xl border border-purple-100">
        <table className="min-w-full divide-y divide-purple-100">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-purple-700 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-100">
            {currentGuests.map((guest) => (
              <tr key={guest.id} className="hover:bg-pink-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {guest.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    guest.confirmed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {guest.confirmed ? 'Confirmado' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onConfirm(guest.id)}
                    disabled={guest.confirmed}
                    className={`px-4 py-1 rounded-full text-xs font-medium transition-colors ${
                      guest.confirmed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    }`}
                  >
                    {guest.confirmed ? 'Confirmado' : 'Confirmar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 disabled:opacity-50"
            >
              &laquo;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-pink-500 text-white'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 disabled:opacity-50"
            >
              &raquo;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default GuestList;