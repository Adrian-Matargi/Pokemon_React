import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/PokemonDetails.css';

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(res.data);
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Altura:</strong> {pokemon.height}</p>
      <p><strong>Peso:</strong> {pokemon.weight}</p>
      <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  );
}

export default PokemonDetails;
