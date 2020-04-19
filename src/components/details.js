import React from 'react';
import { Link } from 'react-router-dom';

const Details = ({ id, title, authors, categories, onBookClick }) => {
  return (
    <div className="book-details">
      {/* here goes link to the book */}
      <Link to={`/${id}`} onClick={() => onBookClick(id)}>
        <h3 className="book-title mb-1">{title}</h3>
      </Link>
      {/* here goes link to authors of the book */}
      <Link to="">
        <h5 className="book-authors mb-1">{authors}</h5>
      </Link>
      {/* find a way to limit authors */}
      <h6 className="book-categories text-muted">{categories}</h6>
    </div>
  );
};

export default Details;
