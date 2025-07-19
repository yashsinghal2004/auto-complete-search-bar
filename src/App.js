import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import "./styles.scss";
import SuggestionList from "./SuggestionList/SuggestionList";

export default function App() {
  const [input, setInput] = useState("");
  const [recipeSuggestions, setRecipeSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchedValue = useDebounce(input, 1000);

  const handleSuggestionClick = (value = "") => {
    setInput(value);
  };

  const fetchData = () => {
    if (sessionStorage.getItem(searchedValue)) {
      return JSON.parse(sessionStorage.getItem(searchedValue));
    }
    fetch(`https://dummyjson.com/recipes/search?q=${searchedValue}`)
      .then((res) => res.json())
      .then((value) => {
        setRecipeSuggestion(value?.recipes ?? []);
        sessionStorage.setItem(searchedValue, JSON.stringify(value?.recipes));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchedValue]);

  return (
    <div className="App">
      <h1>Autocomplete search bar</h1>
      <>
        <input
          type="text"
          className="search-input"
          value={input}
          placeholder="Enter search input"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false);
            }, 200);
          }}
        />
        {showSuggestions && (
          <SuggestionList
            updateInput={handleSuggestionClick}
            recipeSuggestions={recipeSuggestions}
          />
        )}
      </>
    </div>
  );
}
