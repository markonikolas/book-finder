import React from 'react';
import _ from 'lodash';
import Thumbnail from './thumbnail';
import Details from './details';

const Book = ({ data, id }) => {
  const { title, authors = [], categories = [], imageLinks = [] } = data;
  return (
    <div className="book-container d-flex flex-column flex-fill p-2 m-2  animate__animated animate__fadeIn">
      <Thumbnail title={title} imageLinks={imageLinks} />
      <Details
        id={id}
        title={title}
        authors={_.truncate(authors, { length: 30 })}
        categories={categories}
      />
    </div>
  );
};

export default Book;
