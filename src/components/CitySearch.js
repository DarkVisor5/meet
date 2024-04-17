import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);


  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];
    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if  (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("")
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        data-testid="city-search-textbox"
      />
            {showSuggestions ?
              <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
        <li
          key={index}
          data-testid={`suggestion-${suggestion.replace(/,?\s+/g, '-')}`}
          onClick={handleItemClicked}
        >
          {suggestion}
        </li>
      ))}

        <li key='all-cities' data-testid="suggestion-See-all-cities" onClick={handleItemClicked}>
          <b>See all cities</b>
        </li>
      </ul>      
        : null
      }
    </div>
  )
}

export default CitySearch;
