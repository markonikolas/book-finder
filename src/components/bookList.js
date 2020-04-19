import React from 'react';
import Book from './book';

const BookList = ({ query, onBookClick }) => {
  if (query) {
    return (
      <div className="book-list d-flex flex-row p-3 flex-wrap justify-content-start">
        {query.map((volume) => {
          return (
            <Book
              key={volume.id}
              data={volume.data}
              id={volume.id}
              onBookClick={onBookClick}
            />
          );
        })}
      </div>
    );
  } else {
    return [];
  }
};

export default BookList;
