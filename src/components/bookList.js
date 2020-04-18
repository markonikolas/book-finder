import React from 'react';
import Book from './book';
import { Link } from 'react-router-dom';

const BookList = ({ volumes, onBookClick }) => {
  return (
    <div className="book-list d-flex p-3 flex-wrap">
      {volumes.map((volume) => {
        return (
          <Link
            to={`/${volume.id}`}
            key={volume.id}
            onClick={() => {
              onBookClick(volume.id);
            }}>
            <Book data={volume.data} />
          </Link>
        );
      })}
    </div>
  );
};

export default BookList;
