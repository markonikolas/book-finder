import React from 'react';

const ReadMore = (props) => {
  const { previewLink, descriptionLength } = props;
  return descriptionLength >= 900 ? (
    <a href={previewLink} rel="noopener noreferrer">
      Read More &raquo;
    </a>
  ) : (
    ''
  );
};

export default ReadMore;
