import React, { useState, useEffect } from "react";
import "./styles.css";
import { Space, Spin, Button } from "antd";

// UI
import DisplayAllPokemon from "../../components/displayallpokemon/DisplayAllPokemon";

// requests and stuff
import pokeRequests from "../../services/helpers/pokequery";
import { useQuery } from "react-query";
import GenderFilter from "../../components/filter/genderfilter/GenderFilter";
import HabitatFilter from "../../components/filter/habitatfilter/HabitatFilter";
import DisplayAllFilteredPokemon from "../../components/displayallfilteredpokemon/DisplayAllFilteredPokemon";
import RegionFilter from "../../components/filter/regionfilter/RegionFilter";
import NameSearch from "../../components/filter/namesearch/NameSearch";

export default function Home() {
  let [pokemonDisplayList, setPokemonDisplayList] = useState(null);
  let [pagination, setPagination] = useState({
    // these values will be updated  after first query
    offset: 0,
    limit: 48,
    page: 1,
    total: 48,
  });

  // filter states
  let [filterState, setFilterState] = useState({
    filterEnable: false,
    filterType: null,
  });
  let [filteredList, setFilteredList] = useState(null);
  let [filteringList, setFilteringList] = useState(false);

  // list  all pokemons
  //
  const queryDataPokeList = {
    resource: "pokemon-species",
    pagination: pagination,
  };
  const pokeList = useQuery(["pokeListQuery", queryDataPokeList], () =>
    pokeRequests.fetchPokemonsPaginated(queryDataPokeList)
  );

  // Use effect to  set the initial list of pokemons and pagination
  useEffect(() => {
    pokeList.data && setPokemonDisplayList(pokeList.data.results);
    pokeList.data &&
      setPagination({
        ...pagination,
        total: pokeList.data.count,
      });
  }, [pokeList.data]);

  // handlePagination  Updates
  const handlePagination = (pageVal, pageSizeVal) => {
    setPokemonDisplayList(null);
    let previousPagination = { ...pagination };
    // offset is the point where we  would  like to  start
    let n_offset =
      pageVal * previousPagination.limit - previousPagination.limit;
    let n_limit = pageSizeVal;
    let n_page = pageVal;
    // update pagination
    setPagination({
      ...previousPagination,
      limit: n_limit,
      offset: n_offset,
      page: n_page,
    });
  };

  // clear filter
  const clearFilter = () => {
    setFilterState({
      ...filterState,
      filterEnable: false,
      filterType: null,
    });
    setFilteredList(null);
    setFilteringList(false);
  };

  //
  // console.log(filteredList);
  //

  return (
    <div className="__container bg-main">
      <div className="__container__content">
        <div className="home__title-main">
          <h1>PokeDex</h1>
          <p>Everything about pokemons</p>
        </div>
        <div className="home__filters">
          <div className="home__filter-on">
            <Space>
              <Button
                onClick={() => {
                  setFilterState({ ...filterState, filterEnable: true });
                }}
              >
                Filter Pokemons
              </Button>

              <div className="home__filter-type-list">
                {filterState.filterEnable && (
                  <Space>
                    <div>Filter By:</div>

                    <Button
                      className={
                        filterState.filterType === "name"
                          ? "btn-primary-pokedex-active"
                          : null
                      }
                      onClick={() => {
                        setFilterState({
                          ...filterState,
                          filterType: "name",
                        });
                        // setFilteredList(null);
                      }}
                    >
                      Name
                    </Button>

                    <Button
                      className={
                        filterState.filterType === "gender"
                          ? "btn-primary-pokedex-active"
                          : null
                      }
                      onClick={() => {
                        setFilterState({
                          ...filterState,
                          filterType: "gender",
                        });
                        // setFilteredList(null);
                      }}
                    >
                      Gender
                    </Button>

                    <Button
                      className={
                        filterState.filterType === "habitat"
                          ? "btn-primary-pokedex-active"
                          : null
                      }
                      onClick={() => {
                        setFilterState({
                          ...filterState,
                          filterType: "habitat",
                        });
                        // setFilteredList(null);
                      }}
                    >
                      Habitat
                    </Button>
                    <Button
                      className={
                        filterState.filterType === "region"
                          ? "btn-primary-pokedex-active"
                          : null
                      }
                      onClick={() => {
                        setFilterState({
                          ...filterState,
                          filterType: "region",
                        });
                        // setFilteredList(null);
                      }}
                    >
                      Region
                    </Button>

                    <Button
                      type="primary"
                      size="small"
                      danger
                      onClick={() => {
                        clearFilter();
                      }}
                    >
                      X
                    </Button>
                  </Space>
                )}
              </div>
            </Space>
          </div>

          <div className="home__filter-components">
            {filterState.filterEnable &&
              filterState.filterType === "gender" && (
                <GenderFilter
                  setFilteredList={setFilteredList}
                  setFilteringList={setFilteringList}
                />
              )}
            {filterState.filterEnable &&
              filterState.filterType === "habitat" && (
                <HabitatFilter
                  setFilteredList={setFilteredList}
                  setFilteringList={setFilteringList}
                />
              )}

            {filterState.filterEnable &&
              filterState.filterType === "region" && (
                <RegionFilter
                  setFilteredList={setFilteredList}
                  setFilteringList={setFilteringList}
                />
              )}

            {filterState.filterEnable && filterState.filterType === "name" && (
              <NameSearch
                setFilteredList={setFilteredList}
                setFilteringList={setFilteringList}
                pokemonDisplayList={pokemonDisplayList}
                filteredList={filteredList}
              />
            )}
          </div>

          {/*  */}
        </div>
        {/*  */}
        {pokeList.isLoading && <Spin message={"loading"} />}

        {filteringList && <Spin message={"filtering..."} />}
        {/*  */}

        {pokemonDisplayList && (!filteredList || filteredList.legth < 1) && (
          <DisplayAllPokemon
            pokemonDisplayList={pokemonDisplayList}
            handlePagination={handlePagination}
            pagination={pagination}
          />
        )}

        {filterState.filterEnable && filteredList && (
          <DisplayAllFilteredPokemon pokemonDisplayList={filteredList} />
        )}

        {(!pokemonDisplayList || pokemonDisplayList.legth < 1) &&
          (!filteredList || filteredList.legth < 1) && <p>No result</p>}
      </div>
    </div>
  );
}
