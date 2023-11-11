import Header from './components/Header';
import React from 'react';
import backgroundImage from './images/VegetablesBackground.jpg';

function App() {
    const divStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    };

    return (
      <div style={divStyle}>
        <Header />
      </div>
    );
}

export default App;