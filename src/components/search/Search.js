import React, { useState } from "react";
import axios from "axios";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_BASE_URL, GeoApiOptions } from "../../api/api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [error, setError] = useState();

  const loadOptions = async (inputValue) => {
    try {
      const { data: cities } = await axios.get(`${GEO_BASE_URL}/cities/`, {
        ...GeoApiOptions,
        params: {
          namePrefix: inputValue,
        },
      });
      console.log(cities.error);
      return {
        options: cities.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      setError(error)
    }
  };

  const handleSearch = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <>
      {!error && (
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleSearch}
          loadOptions={loadOptions ? loadOptions : { options: [] }}
        />
      )}
      {error && <p>There is an error!</p>}
    </>
  );
};

export default Search;
