import React from 'react';
import { Link } from 'react-router-dom';

const SearchForBook = (props) => {
  const { input, onChange, onClick, onReset } = props;
  return (
    <div>
      <div className="d-flex px-3 mt-5 pb-3 justify-content-center align-items-center">
        <h1 className="logo" onClick={onReset}>
          BookFinder
        </h1>
      </div>

      <div className="d-flex px-3 my-3 justify-content-center align-items-center">
        <input
          type="text"
          className="form-control search-input"
          value={input}
          onChange={onChange}
        />
        <Link to="/" replace>
          <div
            className="search-icon btn btn-dark ml-3 btn-sm"
            onClick={onClick}></div>
        </Link>
      </div>
    </div>
  );
};

export default SearchForBook;
