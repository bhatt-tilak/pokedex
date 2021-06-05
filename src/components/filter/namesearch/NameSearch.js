import React, { useState, useEffect } from "react";

import "./styles.css";

// requests and stuff
import pokeRequests from "../../../services/helpers/pokequery";
import { useQuery } from "react-query";

import { Input, Space } from "antd";
const { Search } = Input;

export default function NameSearch(props) {
  const { setFilteredList, setFilteringList } = props;

  let [searchKeyword, setSearchKeyword] = useState(null);

  const onSearch = (keyword) => {
    if (keyword.length < 1) return;
    console.log(keyword);

    setFilteringList(true);
    setSearchKeyword(keyword);

    handleSearchPokemon(keyword);
  };

  const handleSearchPokemon = (pokeName) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    pokeRequests.fetchFromUrl(url).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  );
}
