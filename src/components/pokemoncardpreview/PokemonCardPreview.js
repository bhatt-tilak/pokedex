import React, { useState } from "react";

import "./styles.css";

import { Spin } from "antd";

// requests and stuff
import pokeRequests from "../../services/helpers/pokequery";
import { useQuery } from "react-query";
import PokemonDetailModal from "../pokemondetailmodal/PokemonDetailModal";

export default function PokemonCardPreview(props) {
  const { pokeName } = props;

  let [pokemonDetailsModalVisible, setPokemonDetailsModalVisible] =
    useState(false);

  const closePokemonDetailModal = () => {
    setPokemonDetailsModalVisible(false);
  };

  // get details of  pokemon by name
  let queryDataPokeDetailsByName = {
    resource: "pokemon",
    keyword: pokeName,
  };
  const pokemonDetails = useQuery(
    ["pokemonDetailsQuery", queryDataPokeDetailsByName],
    () => pokeRequests.fetchOne(queryDataPokeDetailsByName)
  );

  return (
    <>
      <div
        onClick={() => {
          setPokemonDetailsModalVisible(true);
        }}
      >
        <div className="pokemoncardpreview__container">
          {pokemonDetails.isLoading && <Spin />}
          {pokemonDetails.data && (
            <>
              <p className="pokemoncardpreview__poke-name">
                {pokemonDetails.data.name}
              </p>{" "}
              {pokemonDetails.data.sprites && (
                <div className="pokemoncardpreview__poke-thumb">
                  <img
                    src={
                      pokemonDetails.data.sprites.other.dream_world
                        .front_default
                    }
                    alt=""
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {pokemonDetailsModalVisible && pokemonDetails.data && (
        <PokemonDetailModal
          onOk={closePokemonDetailModal}
          onCancel={closePokemonDetailModal}
          isVisible={pokemonDetailsModalVisible}
          pokemonDetails={pokemonDetails.data}
        />
      )}
    </>
  );
}
