import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-white text-green-title p-4 flex justify-between items-center">
      <div>
        <a><img src='../images/CocagneLogo.png' width='150' height='100' alt='Logo des Jardins de Cocagnes'></img></a>
      </div>
      <nav className="flex">
        <Link to="/point-de-depot" className="mr-36">Point de dépôt</Link>
        <Link to="/produits" className="mr-36">Produits</Link>
        <Link to="/calendrier" className="mr-36">Calendrier</Link>
        <Link to="/abonnement" className="mr-36">Abonnement</Link>
      </nav>
      <div className="relative">
        <div className="bg-green-title rounded-full p-4 w-14 h-14 absolute top-0 right-10 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center">
          <Link to="/compte-strucure">
            <FontAwesomeIcon icon={faPagelines} size="2xl" style={{ color: "#ffffff" }} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;  
