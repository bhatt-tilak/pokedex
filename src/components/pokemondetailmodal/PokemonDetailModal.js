import React from "react";
import "./styles.css";

import { Modal, Row, Col } from "antd";
// requests and stuff
import pokeRequests from "../../services/helpers/pokequery";
import { useQuery } from "react-query";

export default function PokemonDetailModal(props) {
  const { onOk, onCancel, isVisible, pokemonDetails } = props;

  //   get more details of pokemon
  let queryData = {
    resource: "pokemon-species",
    keyword: pokemonDetails.name,
  };
  const pokemonSpeciesDetails = useQuery(
    ["pokemonSpeciesDetails", queryData],
    () => pokeRequests.fetchOne(queryData)
  );

  console.log(pokemonDetails);
  console.log(pokemonSpeciesDetails.data);
  return (
    <div>
      <Modal
        visible={isVisible}
        width={900}
        // title="Title"
        onOk={onCancel}
        onCancel={onCancel}
        footer={[]}
      >
        <div className="pokemondetailmodal__container">
          <p className="pokemondetailmodal__poke-name">{pokemonDetails.name}</p>
          <div>
            <Row>
              <Col span={12}>
                <div className="pokemondetailmodal__data-1">
                  <p className="pokemondetailmodal__title-1">Abilities:</p>
                  <div className="flex-row-space-between">
                    {pokemonDetails.abilities.map((item) => {
                      return (
                        <p className="pokemondetailmodal__line-1">
                          {" "}
                          {item.ability.name}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="pokemondetailmodal__data-1">
                  <p className="pokemondetailmodal__title-1">Gender:</p>
                  <div className="flex-row-space-between">
                    {pokemonSpeciesDetails.data && (
                      <p className="pokemondetailmodal__line-1">
                        {parseInt(pokemonSpeciesDetails.data.gender_rate) / 8}{" "}
                        Female
                      </p>
                    )}
                    {pokemonSpeciesDetails.data && (
                      <p className="pokemondetailmodal__line-1">
                        {1 -
                          parseInt(pokemonSpeciesDetails.data.gender_rate) /
                            8}{" "}
                        Male
                      </p>
                    )}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                {pokemonDetails.sprites && (
                  <div className="pokemondetailmodal__poke-thumb">
                    <img
                      src={
                        pokemonDetails.sprites.other.dream_world.front_default
                      }
                      alt=""
                    />
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className="pokemondetailmodal__data-1">
                  <p className="pokemondetailmodal__title-1">Growth Rate:</p>
                  <div className="flex-row-space-between">
                    {pokemonSpeciesDetails.data && (
                      <p className="pokemondetailmodal__line-1">
                        {pokemonSpeciesDetails.data.growth_rate.name}
                      </p>
                    )}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="pokemondetailmodal__data-1">
                  <p className="pokemondetailmodal__title-1">Habitat:</p>
                  <div className="flex-row-space-between">
                    {pokemonSpeciesDetails.data && (
                      <p className="pokemondetailmodal__line-1">
                        {pokemonSpeciesDetails.data.habitat.name}
                      </p>
                    )}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="pokemondetailmodal__data-1">
                  <p className="pokemondetailmodal__title-1">Generation:</p>
                  <div className="flex-row-space-between">
                    {pokemonSpeciesDetails.data && (
                      <p className="pokemondetailmodal__line-1">
                        {pokemonSpeciesDetails.data.generation.name}
                      </p>
                    )}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="pokemondetailmodal__data-1">
                  <p className="pokemondetailmodal__title-1">Color:</p>
                  <div className="flex-row-space-between">
                    {pokemonSpeciesDetails.data && (
                      <p className="pokemondetailmodal__line-1">
                        {pokemonSpeciesDetails.data.color.name}
                      </p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
}
