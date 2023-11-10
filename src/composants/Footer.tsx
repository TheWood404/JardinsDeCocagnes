
const Footer = () => {
  return (
    <footer className="bg-customGreen text-white py-8">
      <div className="container mx-auto md:flex md:justify-between md:items-start">
        {/* Liens utiles */}
        <div className="md:w-1/4 flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-4">Liens Utiles</h4>
        <ul className="space-y-2">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/couverture">Couverture</Link></li>
            <li><Link to="/zinguerie">Zinguerie</Link></li>
        </ul>
        </div>

        

        {/* Informations de contact */}
        <div className="md:w-1/4 flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-4">Contact</h4>
        <p>Téléphone : 03 89 21 69 39</p>
        <p>Adresse : 41 grand rue ZA BelAir, Metzeral</p>
        <p>couverture.baumgart.sarl@gmail.com</p>
        
        </div>
        <div className="md:w-1/4 flex items-center justify-center">

        <ul className="flex space-x-4">
            <li>
                <a href="https://www.facebook.com/baumgartandreetfils/" target="_blank" rel="noopener noreferrer">
                <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
                <FontAwesomeIcon icon={faFacebook} size="xl" className="hover:scale-120 transition-transform" />
                </a>
            </li>
            {/* Ajoutez d'autres liens sociaux ici */}
            </ul>
        </div>

        {/* Logo de l'entreprise */}
            <div className="md:w-1/4 flex items-center justify-center">
            <img
                src="images/logoiconpng.png"
                alt="Logo de l'entreprise"
                className="w-1/2"
            />
            </div>

      </div>

      <div className="mt-4 text-center">
        {/* Mentions légales, conditions générales, etc. */}
        <p>&copy; {new Date().getFullYear()} André BAUMGART et Fils SARL. Tous droits réservés<Link to="/mentions-legales"> | Mentions Légales</Link> | <Link to="/conditions-generales">Conditions Générales</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
