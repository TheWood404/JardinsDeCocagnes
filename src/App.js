import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import RoutePrivee from './components/RoutePrivee';

import { useState } from 'react';

function App() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const [utilisateurConnecte, setUtilisateurConnecte] = useState(null);

  return (
    <Router>
      <div style={divStyle}>
            <Routes>
        {/* Routes publiques accessibles à tous */}
        <Route path="/" element={<AccueilScreen />} />
        <Route path="/connexion-responsable" element={<ConnexionResponsable />} />
        <Route path="/structure-register" element={<StructureRegister />} />
        <Route path="/point-de-depot" element={<PointDeDepot />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/abonnement" element={<Abonnement />} />
        <Route path="/compte-structure" element={<CompteStructure />} />
        <Route path="/tournees" element={<Tournees />} />
        <Route path="/calendrier-ad" element={<CompteAD />} />

        {/* Page de connexion pour les utilisateurs non connectés */}
        <Route
          path="/connexion-adherent"
          element={utilisateurConnecte ? <Navigate to="/compte-adherent" /> : <ConnexionAdherent setUtilisateurConnecte={setUtilisateurConnecte} />}
        />

        {/* Route privée pour le compte-adherent */}
        {utilisateurConnecte ? <Route path="/compte-adherent" element={<CompteAD />} /> : null}
        {utilisateurConnecte ? <Route path="/point-de-depot-ad" element={<PointDeDepotAD />} /> : null}
        {utilisateurConnecte ? <Route path="/produits-ad" element={<ProduitsAD />} /> : null}
        {utilisateurConnecte ? <Route path="/abonnement-ad" element={<AbonnementAD />} /> : null}

        {/* Redirection vers la page de connexion si l'utilisateur n'est pas connecté */}
        {utilisateurConnecte ? null : <Route path="/connexion" element={<Navigate to="/connexion-adherent" />} />}
    </Routes>
      </div>
    </Router>
  );
}

export default App;