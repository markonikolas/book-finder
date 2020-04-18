import React, { Component } from 'react';
import Book from './book';

const BookList = ({ volumes }) => {
  return (
    <div className="d-flex p-3 flex-wrap mx-auto">
      {/* {volumes.map((volume) => (
        <Book key={volume.id} />
      ))} */}
    </div>
  );
};

export default BookList;
