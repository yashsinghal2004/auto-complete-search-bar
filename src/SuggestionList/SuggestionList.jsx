const SuggestionList = ({ updateInput, recipeSuggestions = [] }) => {
  return (
    <ul className="suggestion-list">
      {recipeSuggestions.length ? (
        recipeSuggestions.map(({ id, name }) => (
          <li
            key={id}
            className="suggestion-item"
            onClick={() => {
              updateInput(name);
            }}
          >
            {name}
          </li>
        ))
      ) : (
        <li>
          <h5> Sorry no suggestions</h5>
        </li>
      )}
    </ul>
  );
};

export default SuggestionList;
