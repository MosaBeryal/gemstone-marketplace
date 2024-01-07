import React, { useState, useEffect, useContext } from 'react';
import { debounce } from 'lodash';
import DataContext  from '../../contextStore/DataContext';
import SearchIcon from '../../assets/SearchIcon';
import './search.css';
import axios from 'axios';

function Search() {
  const { setProductsData } = useContext(DataContext);

  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = debounce(async (searchWord) => {
    if (searchWord) {
      const { data } = await axios.get(
        `http://localhost:8800/api/product/all?search=${searchWord}`
      );
      setProductsData(data);
    } else {
      const { data } = await axios.get(`http://localhost:8800/api/product/all`);
      setProductsData(data);
    }
  }
    , 500);

  const handleChange = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    handleFilter(searchWord);
  };

  return (
    <div className="search-container">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search Products By Name and Location."
          value={wordEntered}
          onChange={handleChange}
        />
        <div className="search-icon">
          <div>
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
