import React, { useState } from 'react';
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "", // Changed 'location' to 'city' for consistency
    minPrice: 0,
    maxPrice: 0
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
  };

  return (
    <div className='searchBar'>
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={type === query.type ? "active" : ''}>
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='city'
          placeholder='City'
          onChange={handleChange}
        />
        <input
          type="number"
          name='minPrice'
          min={0}
          max={1000000}
          placeholder='Min Price'
          onChange={handleChange}
        />
        <input
          type="number"
          name='maxPrice'
          min={0}
          max={1000000}
          placeholder='Max Price'
          onChange={handleChange}
        />
        <Link 
          to={`/list?type=${query.type}&city=${encodeURIComponent(query.city)}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button type="button">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
