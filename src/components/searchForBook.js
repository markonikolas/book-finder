import React from 'react';

const SearchForBook = (props) => {
  const { input, onChange, onClick } = props;
  return (
    <div>
      <div className="d-flex px-3 mt-5 pb-3 justify-content-center align-items-center">
        <h1 className="logo mr-4">BookFinder</h1>
      </div>

      <div className="d-flex px-3 my-3 justify-content-center align-items-center">
        <input
          type="text"
          className="form-control search-input"
          value={input}
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
