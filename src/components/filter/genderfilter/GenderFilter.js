import React, { useState, useEffect } from "react";

import "./styles.css";

// requests and stuff
import pokeRequests from "../../../services/helpers/pokequery";
import { useQuery } from "react-query";

import { Select, Space } from "antd";

const { Option } = Select;

export default function GenderFilter(props) {
  const { setFilteredList, setFilteringList } = props;

  let [genderList, setGenderList] = useState(null);

  let [selectedGender, setSelectedGender] = useState(null);
  let [listOfAllPokemonsByGender, setListOfAllPokemonsByGender] =
    useState(null);

  //
  // list all genders
  //
  let queryDataListAllGenders = {
    resource: "gender",
  };
  const genderListQueryResult = useQuery(
    ["genderListQuery", queryDataListAllGenders],
    () => pokeRequests.fetchAll(queryDataListAllGenders)
  );

  // create a list of genders
  // this list is for the options  list
  useEffect(() => {
    if (genderListQueryResult.data) {
      setGenderList(genderListQueryResult.data.results);
    }
  }, [genderListQueryResult.data]);
  //   create a option list

  // effect
  useEffect(() => {
    let a = [];

    if (listOfAllPokemonsByGender && listOfAllPokemonsByGender.length > 0) {
      listOfAllPokemonsByGender.map((item) => {
        a.push(item.pokemon_species.name);
      });
    }

    // console.log(a);
    if (a.length > 0) setFilteredList(a);
    setFilteringList(false);
  }, [listOfAllPokemonsByGender]);

  //
  const handleChange = (e) => {
    setFilteredList(null);
    setFilteringList(true);
    // console.log(e);
    handlePokemonListFetchAndSetToList(e);
    // spin on
  };
  const handlePokemonListFetchAndSetToList = (url) => {
    pokeRequests.fetchFromUrl(url).then((res) => {
      setSelectedGender(res.name);
      setListOfAllPokemonsByGender(res.pokemon_species_details);
    });
  };

  return (
    <div>
      <Space>
        <p className="genderfilter__title">Select Gender:</p>
        <Select style={{ width: 200 }} onChange={handleChange}>
          {genderList &&
            genderList.map((gender) => {
              return (
                <Option key={gender.name} value={gender.url}>
                  <span className="genderfilter__option-name">
                    {gender.name}
                  </span>
                </Option>
              );
            })}
        </Select>
      </Space>
    </div>
  );
}
