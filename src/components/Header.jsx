import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-white text-black p-4 flex justify-between items-center">
      <div>
        <a ><img src='../images/CocagneLogo.png' width='150' height='100' alt='Logo des Jardins de Cocagnes'></img></a>
      </div>
      <nav className="flex">
        <Link to="/point-de-depot">Point de dépôt</Link>
        <Link to="/produits">Produits</Link>
        <Link to="/calendrier">Calendrier</Link>
        <Link to="/abonnement">Abonnement</Link>
      </nav>

      <div className="text-2xl font-bold">
        <Link to="/compte-strucure">Nav Logo</Link>
      </div>
    </header>
  );
};

export default Header;  
