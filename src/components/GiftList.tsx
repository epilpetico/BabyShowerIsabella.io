import React from 'react';
import * as LucideIcons from 'lucide-react';

interface Gift {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface GiftListProps {
  gifts: Gift[];
}

const GiftList: React.FC<GiftListProps> = ({ gifts }) => {
  // Function to get the icon component
  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName] || LucideIcons.Gift;
    return <Icon className="h-10 w-10 text-pink-500" />;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md animate-slideUp">
      <h2 className="text-3xl font-bold text-pink-700 mb-8 text-center">Lista de Regalos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gifts.map((gift) => (
          <div 
            key={gift.id} 
            className="bg-purple-50 rounded-xl p-4 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
              {getIcon(gift.icon)}
            </div>
            <h3 className="font-bold text-purple-800 mb-1">{gift.name}</h3>
            <p className="text-sm text-purple-600">{gift.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftList;