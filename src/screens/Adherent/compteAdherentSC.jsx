import React from 'react';
import HeaderAD from '../../components/HeaderAD'; // Importez le composant Header
import AdherentInfo from '../../components/AdherentInfo';


function CompteAD() {
  return (
    <div>
      <HeaderAD  afficherHeader={true} />
      <div className='p-10'>
      <AdherentInfo />
      </div>
    </div>
  );
}

export default CompteAD;
