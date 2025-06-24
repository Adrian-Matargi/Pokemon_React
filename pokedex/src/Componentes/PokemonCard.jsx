import React from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/PokemonCard.css';

function PokemonCard({ name, image }) {
  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${name}`}>
        <img src={image} alt={name} />
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      </Link>
    </div>
  );
}

export default PokemonCard;
