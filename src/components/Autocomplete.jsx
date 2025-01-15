// file: Autocomplete.js
import  { useState, useEffect, useRef } from "react";
import "./Autocomplete.css";

const Autocomplete = ({ suggestions }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (query) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && activeIndex < filteredSuggestions.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "ArrowUp" && activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setQuery(filteredSuggestions[activeIndex]);
      setShowSuggestions(false);
    }
  };

  const renderSuggestions = () =>
    showSuggestions && query && filteredSuggestions.length > 0 ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li
            key={suggestion}
            className={index === activeIndex ? "active" : ""}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {highlightMatch(suggestion, query)}
          </li>
        ))}
      </ul>
    ) : null;

  const highlightMatch = (text, match) => {
    const parts = text.split(new RegExp(`(${match})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === match.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder="Type to search..."
      />
      {renderSuggestions()}
    </div>
  );
};

// export default Autocomplete;

// file: App.js
// import Autocomplete from "./Autocomplete";

const sampleSuggestions = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Grapes",
  "Blueberry",
  "Strawberry",
  "Pineapple",
];

const App = () => (
  <div style={{ padding: "20px" }}>
    <h1>Autocomplete / Typeahead Component</h1>
    <Autocomplete suggestions={sampleSuggestions} />
  </div>
);

export default App;

