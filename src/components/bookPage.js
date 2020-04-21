import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';

import ReadMore from './readMore';
import Spinner from './spinner';

const BookPage = (props) => {
  const {
    authors = [],
    imageLinks = [],
    title = 'No Title',
    pageCount = 'Unknown',
    publisher = 'Unknown',
    previewLink = '',
    publishedDate = 'No date',
    ratingsCount = 'No ratings',
    description = 'No description',
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  const filteredDescription = _.replace(
    description,
    /<\/?li>|<\/?ul>|<\/?ol>|<\/?i>|<br\/?>|<\/?p>|<\/?b>/g /* remove tags */,
    ' ',
  );

  const shortDescription = _.truncate(filteredDescription, { length: 900 });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container-fluid d-flex justify-content-center mt-5">
          <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row no-gutters">
              <div className="col-md-4 p-4 page-container-image">
                <div>
                  <img
                    src={imageLinks.thumbnail}
                    className="card-img"
                    alt={title}
                  />
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    <b>Reviews</b> {ratingsCount}
                  </small>
                  <br />
                  <small className="text-muted">
                    <b>Page Count</b> {pageCount}
                  </small>
                  <br />
                  <small className="text-muted">
                    <b>Published:</b> {publishedDate}
                  </small>
                  <br />
                  <small className="text-muted">
                    <b>Publisher</b> {publisher}
                  </small>
                  <br />
                  <small className="text-muted">
                    <a
                      href={previewLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <b>External Link</b>
                    </a>
                  </small>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title mb-0 mt-1">
                    <b>{title}</b>
                  </h5>
                  <small className="text-muted">
                    by <b>{authors[0]}</b>
                  </small>
                  <p className="small mt-3">
                    {shortDescription}
                    <ReadMore
                      previewLink={previewLink}
                      descriptionLength={shortDescription.length}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookPage;
