import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Icônes pour le menu burger
import { Link } from 'react-router-dom';

const Header = ({ afficherHeader }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    afficherHeader && (
      <header className="bg-white text-green-title p-4 flex justify-between items-center">
        <div>
          <a href="/">
            <img src='../images/CocagneLogo.png' width='150' height='100' alt='Logo des Jardins de Cocagnes' />
          </a>
        </div>
        <nav className="hidden md:flex items-center">
          <div className="flex">
            <Link to="/point-de-depot" className="mr-8">Point de dépôt</Link>
            <Link to="/produits" className="mr-8">Produits</Link>
            <Link to="/calendrier" className="mr-8">Calendrier</Link>
            <Link to="/abonnement" className="mr-8">Abonnement</Link>
            <Link to="/tournees" className="mr-8">Tournées</Link>
          </div>
          <div className="bg-green-title rounded-full p-4 w-14 h-14 transform flex items-center justify-center text-center">
            <Link to="/compte-structure">
              <FontAwesomeIcon icon={faPagelines} size="2xl" style={{ color: "#ffffff" }} />
            </Link>
          </div>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FontAwesomeIcon icon={faTimes} className="text-green-title text-2xl" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="text-green-title text-2xl" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white p-4 border rounded-lg shadow-md">
            <ul>
              <li className="mb-2">
                <Link to="/point-de-depot" onClick={toggleMenu}>Point de dépôt</Link>
              </li>
              <li className="mb-2">
                <Link to="/produits" onClick={toggleMenu}>Produits</Link>
              </li>
              <li className="mb-2">
                <Link to="/calendrier" onClick={toggleMenu}>Calendrier</Link>
              </li>
              <li className="mb-2">
                <Link to="/abonnement" onClick={toggleMenu}>Abonnement</Link>
              </li>
              <li className="mb-2">
                <Link to="/tournees" onClick={toggleMenu}>Tournées</Link>
              </li>
              <li>
                <Link to="/compte-structure" onClick={toggleMenu}>Compte Structure</Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    )
  );
};

export default Header;
