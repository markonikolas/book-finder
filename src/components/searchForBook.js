import React from 'react';
import { Link } from 'react-router-dom';
const SearchForBook = (props) => {
  const { input, onChange, onClick } = props;
  return (
    <div>
      <div className="d-flex px-3 mt-5 pb-3 justify-content-center align-items-center">
        <Link to="/">
          <h1 className="logo">BookFinder</h1>
        </Link>
      </div>

      <div className="d-flex px-3 my-3 justify-content-center align-items-center">
        <input
          type="text"
          className="form-control search-input"
          defaultValue={input}
          onChange={onChange}
        />
        <div
          className="search-icon btn btn-dark ml-3 btn-sm"
          onClick={onClick}></div>
      </div>
    </div>
  );
};

export default SearchForBook;
