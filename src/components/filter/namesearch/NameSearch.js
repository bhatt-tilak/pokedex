import React, { useState, useEffect } from "react";

import "./styles.css";

// requests and stuff
import pokeRequests from "../../../services/helpers/pokequery";
import { useQuery } from "react-query";

import { Input, Space } from "antd";
const { Search } = Input;

export default function NameSearch(props) {
  const { setFilteredList, setFilteringList } = props;
  const { pokemonDisplayList } = props;

  const [listOfAllItems, setListOfAllItems] = useState(null);
  let [searchKeyword, setSearchKeyword] = useState(null);

  //  list of  all items  set

  useEffect(() => {
    let z = [];
    if (pokemonDisplayList && pokemonDisplayList.length > 0) {
      pokemonDisplayList.map((item) => {
        z.push(item.name);
      });
      setListOfAllItems(z);
    }
  }, [pokemonDisplayList]);

  const onSearch = (keyword) => {
    if (keyword.length < 1) {
      setFilteredList(false);
      setFilteredList(false);
      return;
    }

    // set  filtering
    setFilteringList(true);
    setSearchKeyword(keyword);

    if (listOfAllItems) {
      handleSearchPokemon(keyword, listOfAllItems);
    }
  };

  const handleSearchPokemon = (pokeName, list) => {
    let x = pokeName.toUpperCase();
    console.log(list);
    let newList = list.filter((item) => item.toUpperCase().indexOf(x) > -1);

    console.log(newList);
    setFilteringList(false);
    setFilteredList(newList);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        enterButton
      />
    </div>
  );
}
