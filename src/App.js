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
import StructureRegister from './screens/Structure/registerStructureSC';
import CompteAD from './screens/Adherent/compteAdherentSC';
import PointDeDepotAD from './screens/Adherent/pointdedepotAdherentSC';
import ProduitsAD from './screens/Adherent/produitsAdherentSC';
import AbonnementAD from './screens/Adherent/abonnementAdherentSC';

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
          <Route path="/tournees" element={<Tournees />} />


          <Route path="/" element={<AccueilScreen />} />
          <Route path="/connexion-responsable" element={<ConnexionResponsable />} />
          <Route path="/connexion-adherent" element={<ConnexionAdherent />} />
          <Route path="/structure-register" element={<StructureRegister />} />

          <Route path="/compte-adherent" element={<CompteAD />} />
          <Route path="/point-de-depot-ad" element={<PointDeDepotAD />} />
          <Route path="/produits-ad" element={<ProduitsAD />} />
          <Route path="/calendrier-ad" element={<CompteAD />} />
          <Route path="/abonnement-ad" element={<AbonnementAD />} />


        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
