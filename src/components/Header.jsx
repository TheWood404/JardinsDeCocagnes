import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Logo</div>
      <nav className="flex">
        <a href="#" className="mr-4">Accueil</a>
        <a href="#" className="mr-4">À propos</a>
        <a href="#" className="mr-4">Services</a>
        <a href="#">Contact</a>
      </nav>
      <div className="text-2xl font-bold">Nav Logo</div>
    </header>
  );
};

export default Header;
