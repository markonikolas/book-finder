import React from 'react';
import _ from 'lodash';

const BookPage = (props) => {
  const {
    title = 'No Title',
    authors = [],
    pageCount = 'Unknown',
    publisher = 'Unknown',
    description = 'No description',
    ratingsCount = 'No ratings',
    publishedDate = 'No date',
    imageLinks = [],
  } = props;

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row no-gutters">
          <div className="col-md-4 p-4">
            <img src={imageLinks.thumbnail} className="card-img" alt={title} />
            <div className="mt-3">
              <small className="text-muted">
                <b>Reviews</b> {ratingsCount}
              </small>
              <br />
              <small className="text-muted">
                <b>Page Count</b> {pageCount}
              </small>
              <br />
              <small className="text-muted">
                <b>Publisher</b> {publisher}
              </small>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title mb-0 mt-1">
                <b>{title}</b>
              </h5>
              <small className="text-muted mb-3">by {authors}</small>
              <p className="small mt-2">
                {_.replace(
                  description,
                  /<\/?li>|<\/?ul>|<\/?ol>|<\/?i>|<br\/?>|<\/?p>|<\/?b>/g,
                  ' ',
                  {
                    /* good for now */
                  },
                )}
              </p>
              <p className="card-text">
                <small className="text-muted">
                  <b>Published:</b> {publishedDate}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
