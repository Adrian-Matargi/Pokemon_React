import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Componentes/Navbar';
import Home from './Paginas/Home';
import PokemonDetails from './Paginas/PokemonDetails';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
