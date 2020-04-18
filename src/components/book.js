import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ data }) => {
  const { title, authors, categories, imageLinks = [] } = data;
  return (
    <div className="p-3 m-3 book-container">
      <div className="mb-2 image-container">
        <img
          className="img-fluid book-image"
          src={imageLinks.thumbnail}
          alt={title}
        />
      </div>

      <div className="book-details">
        {/* here goes link to the book */}
        <h3 className="book-title mb-1">{title}</h3>
        {/* here goes link to authors of the book */}
        <h5 className="book-authors mb-1">{authors[0]}</h5>
        <h6 className="book-categories text-muted">{categories}</h6>
      </div>
    </div>
  );
};

export default Book;
