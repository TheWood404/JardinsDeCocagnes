import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PointDeDepot from './screens/point-de-depot';
import Produits from './screens/produits';
import Calendrier from './screens/calendrier';
import Abonnement from './screens/abonnement';
import backgroundImage from './images/VegetablesBackground.jpg';
import CompteStructure from './screens/compte-structure';
import AccueilScreen from './screens/accueil-connexion';
import ConnexionResponsable from './components/Connexion_responsable';
import ConnexionAdherent from './components/Connexion_adherent';

function App() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <Router>
      <div style={divStyle}>

        <Routes>
          <Route path="/point-de-depot" element={<PointDeDepot />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/compte-structure" element={<CompteStructure />} />
          <Route path="/accueil-connexion" element={<AccueilScreen />} />
          <Route path="/connexion-responsable" element={<ConnexionResponsable />} />
          <Route path="/connexion-adherent" element={<ConnexionAdherent />} />

        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
