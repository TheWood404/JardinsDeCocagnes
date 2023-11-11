import React from 'react';

const Header = () => {
  return (
    <header className="bg-white text-black p-4 flex justify-between items-center">
      <div>
        <a href="#"><img src='../images/CocagneLogo.png' width='150' height='100' alt='Logo des Jardins de Cocagnes'></img></a>
      </div>
      <nav className="flex">
        <a href="#" className="mr-4">Point de dépôt</a>
        <a href="#" className="mr-4">Produits</a>
        <a href="#" className="mr-4">Calendrier</a>
        <a href="#" className='mr-4'>Abonnement</a>
      </nav>
      <div className="text-2xl font-bold">
        <a href="#">Nav Logo</a>
      </div>
    </header>
  );
};

export default Header;  
