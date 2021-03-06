import React from 'react';

import Book from './book';

const BookList = ({ query }) => {
  return query ? (
    <div className="book-list d-flex flex-row p-3 flex-wrap justify-content-start ">
      {query.map((volume) => {
        return <Book key={volume.id} data={volume.data} id={volume.id} />;
      })}
    </div>
  ) : null;
};

export default BookList;
