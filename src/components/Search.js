import React from "react";

function Search(props) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => props.search(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
