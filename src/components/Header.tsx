import React from 'react';

const Header = () => {
  return (
    <header className="relative">
      <div className="w-full h-[500px] bg-cover bg-center" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundPosition: 'center 30%'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/70 to-purple-200/70 flex flex-col items-center justify-center text-center px-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-800 mb-4 font-['Pacifico',_cursive] drop-shadow-md">
              ¡Bienvenidos al Baby Shower de Isabella!
            </h1>
            <p className="text-xl md:text-2xl text-purple-800 max-w-2xl mx-auto font-medium">
              Celebremos juntos la llegada de nuestra princesa. ¡Esperamos verte allí!
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="h-12 bg-white rounded-t-3xl shadow-md"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;