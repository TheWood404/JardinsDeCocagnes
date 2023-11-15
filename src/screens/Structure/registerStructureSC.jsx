import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header
import StructureRegisterCP from '../../components/StructureRegisterCP'; 

function StructureRegister() {
  return (
    <div>
      <Header afficherHeader={false} />

      <StructureRegisterCP />
    </div>
  );
}

export default StructureRegister;
