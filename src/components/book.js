import React from 'react';

import Thumbnail from './thumbnail';
import Details from './details';

const Book = ({ data, id, onBookClick }) => {
  const { title, authors, categories, imageLinks = [] } = data;
  return (
    <div className="book-container d-flex flex-column flex-fill p-2 m-2">
      <Thumbnail title={title} imageLinks={imageLinks} />
      <Details
        id={id}
        title={title}
        authors={authors}
        categories={categories}
        onBookClick={onBookClick}
      />
    </div>
  );
};

export default Book;
