import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../Componentes/PokemonCard";
import "../Estilos/Home.css";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");

  // Pega a lista de pokemons com imagens
  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
      const results = await Promise.all(
        res.data.results.map(async (pokemon) => {
          const pokeData = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: pokeData.data.sprites.front_default,
            types: pokeData.data.types.map((t) => t.type.name),
          };
        })
      );
      setPokemonList(results);
    };
    fetchPokemonList();
  }, []);

  // Pega os tipos disponíveis
  useEffect(() => {
    const fetchTypes = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/type");
      setTypes(res.data.results.map((type) => type.name));
    };
    fetchTypes();
  }, []);

  // Filtra pokemonList pelo nome e tipo
  const filteredPokemons = pokemonList.filter((pokemon) => {
    const matchName = pokemon.name.toLowerCase().includes(filterName.toLowerCase());
    const matchType = filterType === "" || pokemon.types.includes(filterType);
    return matchName && matchType;
  });

  return (
    <div className="home-wrapper">
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="filter-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos os tipos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="home-container">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />
          ))
        ) : (
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
