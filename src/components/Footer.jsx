import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-green-title p-4">
      <div className="flex justify-between items-center">
        <div>
          <a href="/">
            <img
              src="../images/CocagneLogo.png"
              width="150"
              height="100"
              alt="Logo des Jardins de Cocagnes"
            />
          </a>
        </div>
        <nav className="hidden md:flex items-center">
          <div className="flex">
            <Link to="/mentions-legales" className="mr-8">
              Mentions légales
            </Link>
            <Link to="/contact" className="mr-8">
              Contact
            </Link>
          </div>
          <div className="bg-green-title rounded-full p-4 w-14 h-14 transform flex items-center justify-center text-center">
            <Link to="/compte-structure">
              <FontAwesomeIcon icon={faPagelines} size="2xl" style={{ color: "#ffffff" }} />
            </Link>
          </div>
        </nav>
      </div>
      <div className="md:hidden mt-4">
        <ul>
          <li className="mb-2">
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li className="mb-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/compte-structure">Compte Structure</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
