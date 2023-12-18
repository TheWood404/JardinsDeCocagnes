import React from 'react';
import HeaderAD from '../../components/HeaderAD'; // Importez le composant Header
import AbonnementPropose from '../../components/AbonementProposeCP';
import AbonnementEnCours from '../../components/AbonnementEnCoursCP';


function AbonnementAD() {

  return (
    <div>
      <HeaderAD  afficherHeader={true}/>
      <AbonnementPropose   />
      <AbonnementEnCours   />

    </div>
  );
}

export default AbonnementAD;