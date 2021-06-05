import React, { useState, useEffect } from "react";

import "./styles.css";

// requests and stuff
import pokeRequests from "../../../services/helpers/pokequery";
import { useQuery } from "react-query";

import { Select, Space } from "antd";

const { Option } = Select;

export default function HabitatFilter(props) {
  const { setFilteredList, setFilteringList } = props;

  let [habitatList, setHabitatList] = useState(null);

  let [selectedHabitat, setSelectedHabitat] = useState(null);

  let [listOfAllPokemonsByHabitat, setListOfAllPokemonsByHabitat] =
    useState(null);

  //
  // list all Habitats
  //
  let queryDataListAllHabitats = {
    resource: "pokemon-habitat",
  };
  const habitatListQueryResult = useQuery(
    ["habitatListQuery", queryDataListAllHabitats],
    () => pokeRequests.fetchAll(queryDataListAllHabitats)
  );

  // create a list of habitats
  // this list is for the options  list
  useEffect(() => {
    if (habitatListQueryResult.data) {
      setHabitatList(habitatListQueryResult.data.results);
    }
  }, [habitatListQueryResult.data]);
  //   create a option list

  // effect
  useEffect(() => {
    let a = [];
    if (listOfAllPokemonsByHabitat && listOfAllPokemonsByHabitat.length > 0) {
      listOfAllPokemonsByHabitat.map((item) => {
        a.push(item.name);
      });
    }
    // console.log(a);
    //
    if (a.length > 0) {
      setFilteredList(a);
    }
    setFilteringList(false);
    //
  }, [listOfAllPokemonsByHabitat]);

  //
  const handleChange = (e) => {
    setFilteredList(null);
    setFilteringList(true);
    // console.log(e);
    handlePokemonListFetchAndSetToList(e);
  };
  const handlePokemonListFetchAndSetToList = (url) => {
    pokeRequests.fetchFromUrl(url).then((res) => {
      setSelectedHabitat(res.name);
      setListOfAllPokemonsByHabitat(res.pokemon_species);
    });
  };

  return (
    <div>
      <Space>
        <p className="habitatfilter__title">Select Habitat:</p>
        <Select style={{ width: 200 }} onChange={handleChange}>
          {habitatList &&
            habitatList.map((Habitat) => {
              return (
                <Option key={Habitat.name} value={Habitat.url}>
                  <span className="habitatfilter__option-name">
                    {Habitat.name}
                  </span>
                </Option>
              );
            })}
        </Select>
      </Space>
    </div>
  );
}
