import React, { useState, useEffect } from "react";

import "./styles.css";

// requests and stuff
import pokeRequests from "../../../services/helpers/pokequery";
import { useQuery } from "react-query";

import { Select, Space } from "antd";

const { Option } = Select;

export default function RegionFilter(props) {
  const { setFilteredList, setFilteringList } = props;

  let [regionList, setRegionList] = useState(null);

  let [selectedRegion, setSelectedRegion] = useState(null);

  let [listOfAllPokemonsByRegion, setListOfAllPokemonsByRegion] =
    useState(null);
  //
  // list all regions
  //
  let queryDataListAllregions = {
    resource: "pokedex",
  };
  const regionListQueryResult = useQuery(
    ["regionListQuery", queryDataListAllregions],
    () => pokeRequests.fetchAll(queryDataListAllregions)
  );

  // create a list of regions
  // this list is for the options  list
  useEffect(() => {
    if (regionListQueryResult.data) {
      if (
        regionListQueryResult.data.count !==
        regionListQueryResult.data.results.length
      ) {
        // this means the total data hasnt been fetch
        // now  you  need to  fetch  data using url and rewrite the list
        let t_offset = 0;
        let t_limit = regionListQueryResult.data.count;
        let url = `https://pokeapi.co/api/v2/${queryDataListAllregions.resource}?$offset=${t_offset}&limit=${t_limit}`;

        pokeRequests.fetchFromUrl(url).then((res) => {
          if (res.results) {
            setRegionList(res.results);
          }
        });
      } else {
        setRegionList(regionListQueryResult.data.results);
      }
    }
  }, [regionListQueryResult.data]);
  //   create a option list

  // effect
  useEffect(() => {
    let a = [];
    if (listOfAllPokemonsByRegion && listOfAllPokemonsByRegion.length > 0) {
      listOfAllPokemonsByRegion.map((item) => {
        a.push(item.pokemon_species.name);
      });
    }
    // console.log(a);
    if (a.length > 0) {
      setFilteredList(a);
    }
    setFilteringList(false);
  }, [listOfAllPokemonsByRegion]);

  //
  const handleChange = (e) => {
    setFilteredList(null);
    setFilteringList(true);
    console.log(e);
    handlePokemonListFetchAndSetToList(e);
    // spin on
  };
  const handlePokemonListFetchAndSetToList = (url) => {
    pokeRequests.fetchFromUrl(url).then((res) => {
      setSelectedRegion(res.name);
      setListOfAllPokemonsByRegion(res.pokemon_entries);
    });
  };

  return (
    <div>
      <Space>
        <p className="regionfilter__title">Select Region:</p>
        <Select style={{ width: 200 }} onChange={handleChange}>
          {regionList &&
            regionList.map((region) => {
              return (
                <Option key={region.name} value={region.url}>
                  <span className="regionfilter__option-name">
                    {region.name}
                  </span>
                </Option>
              );
            })}
        </Select>
      </Space>
    </div>
  );
}
