import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-white text-green-title p-4 flex justify-between items-center">
      <div>
        <a ><img src='../images/CocagneLogo.png' width='150' height='100' alt='Logo des Jardins de Cocagnes'></img></a>
      </div>
      <nav className="flex">
        <a href="#" className="mr-36">Point de dépôt</a>
        <a href="#" className="mr-36">Produits</a>
        <a href="#" className="mr-36">Calendrier</a>
        <a href="#" className='mr-36'>Abonnement</a>
      </nav>
      <div className="relative">
        <div className="bg-green-title rounded-full p-4 w-14 h-14 absolute top-0 right-10 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center">
          <FontAwesomeIcon icon={faPagelines} size="2xl" style={{ color: "#ffffff" }} />
        </div>
        <Link to="/point-de-depot">Point de dépôt</Link>
        <Link to="/produits">Produits</Link>
        <Link to="/calendrier">Calendrier</Link>
        <Link to="/abonnement">Abonnement</Link>
      </div>

      <div className="text-2xl font-bold">
        <Link to="/compte-strucure">Nav Logo</Link>
      </div>
    </header>
  );
};

export default Header;  
