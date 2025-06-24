import React from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Pokédex</Link>
    </nav>
  );
}

export default Navbar;
