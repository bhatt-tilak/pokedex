import React from "react";
import "./styles.css";

import { Row, Col, Pagination } from "antd";

import PokemonCardPreview from "../pokemoncardpreview/PokemonCardPreview";

export default function DisplayAllPokemon(props) {
  const { pokemonDisplayList, pagination, handlePagination } = props;

  // console.log(pagination);

  return (
    <div className="displayallpokemon__container">
      <Row gutter={[16, 16]}>
        {pokemonDisplayList.map((pokeItem) => {
          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
              xxl={{ span: 4 }}
              key={pokeItem.name}
            >
              <div>
                <PokemonCardPreview pokeName={pokeItem.name} />
              </div>
            </Col>
          );
        })}
      </Row>
      <div className="displayallpokemon__pagination">
        <Pagination
          defaultCurrent={pagination.page}
          total={pagination.total}
          pageSize={pagination.limit}
          onChange={(page, pageSize) => {
            handlePagination(page, pageSize);
          }}
        />
      </div>
    </div>
  );
}
