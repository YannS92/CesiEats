import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/search.svg";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetch(`http://localhost:2000/article`)
        .then((response) => response.json())
        .then((data) => {
          const filteredResults = new Set();
          data.forEach((article) => {
            article.tags.forEach((tag) => {
              if (tag.toLowerCase().includes(inputValue.trim().toLowerCase())) {
                filteredResults.add(tag);
              }
            });
          });
          setSearchResults(Array.from(filteredResults));
          setShowDropdown(true);
        })
        .catch((error) => console.log(error));
    } else {
      setShowDropdown(false);
    }
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const searchTag = inputValue.trim().toLowerCase();
      navigate(`/search-result?tag=${searchTag}`);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const handleTagClick = (tag) => {
    setInputValue(tag);
    handleDropdownClose();
  };

  const filteredDropdownResults = searchResults.filter(
    (tag) => tag.toLowerCase() !== inputValue.trim().toLowerCase()
  );

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            id="header-search"
            placeholder="Find your favourite food"
            name="search"
            className="search-input"
            value={inputValue}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="submit" className="search-button hover:scale-110">
            <span className="search-button-text" style={{ fontWeight: "bold" }}>
              Search
            </span>
            <img src={SearchIcon} alt="search" className="search-icon" />
          </button>
        </form>
      </div>
      {showDropdown && (
        <div className="dropdown-container">
          {filteredDropdownResults.length > 0 && (
            <div className="search-dropdown">
              <ul className="dropdown-list">
                {filteredDropdownResults.map((tag, index) => (
                  <li key={index} onClick={() => handleTagClick(tag)} style={{ cursor: "pointer" }}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
  };

export default SearchBar;
