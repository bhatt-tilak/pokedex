import React, { useState, useEffect } from "react";
import "./styles.css";

import { Row, Col, Pagination } from "antd";

import PokemonCardPreview from "../pokemoncardpreview/PokemonCardPreview";

export default function DisplayAllFilteredPokemon(props) {
  const { pokemonDisplayList } = props;

  let [truncatedList, setTruncatedList] = useState(null);

  let [pagination, setPagination] = useState({
    // these values will be updated  after first query
    start: 0,
    end: 48,

    pageSize: 48,

    page: 1,
    total: 48,
  });

  // Use effect to  set the initial list of pokemons and pagination
  useEffect(() => {
    let listLength = pokemonDisplayList.length;
    // console.log(listLength);
    if (listLength > 0) {
      setTruncatedList(
        pokemonDisplayList.slice(pagination.start, pagination.end)
      );
      setPagination({
        ...pagination,
        total: listLength,
      });
    }
  }, [pokemonDisplayList]);

  // handlePagination  Updates
  const handlePagination = (pageVal, pageSizeVal) => {
    let previousPagination = { ...pagination };
    // offset is the point where we  would  like to  start
    let n_start = pageVal * pageSizeVal;
    let n_end = n_start + pageSizeVal;
    let n_page = pageVal;
    let n_pageSize = pageSizeVal;
    // update pagination

    setPagination({
      ...previousPagination,
      start: n_start,
      end: n_end,
      page: n_page,
      pageSize: n_pageSize,
    });

    setTruncatedList(pokemonDisplayList.slice(n_start, n_end));
  };

  // console.log(pokemonDisplayList);
  // console.log(truncatedList);

  return (
    <div className="displayallpokemon__container">
      <Row gutter={[16, 16]}>
        {/* {pokemonDisplayList.length < 1 && <p>No Results</p>} */}

        {truncatedList &&
          truncatedList.map((pokeName) => {
            return (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 4 }}
                xxl={{ span: 4 }}
                key={pokeName}
              >
                <div>
                  <PokemonCardPreview pokeName={pokeName} />
                </div>
              </Col>
            );
          })}
      </Row>

      {truncatedList && (
        <div className="displayallpokemon__pagination">
          <Pagination
            defaultCurrent={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={(page, pageSize) => {
              handlePagination(page, pageSize);
            }}
          />
        </div>
      )}
    </div>
  );
}
