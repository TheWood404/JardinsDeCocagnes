import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PointDeDepot from './screens/Structure/pointDeDepotStructureSC';
import Produits from './screens/Structure/produitsStructureSC';
import Calendrier from './screens/Structure/calendrierStructureSC';
import Abonnement from './screens/Structure/abonnementStructureSC';
import backgroundImage from './images/VegetablesBackground.jpg';
import CompteStructure from './screens/Structure/compteStructureSC';
import AccueilScreen from './screens/accueilConnexionSC';
import ConnexionResponsable from './components/ConnexionResponsableCP';
import ConnexionAdherent from './components/ConnexionAdherentCP';
import Tournees from './screens/Structure/tourneesStructureSC';

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
          <Route path="/tournees" element={<Tournees />} />

        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
