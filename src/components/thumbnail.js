import React from 'react';

const Thumbnail = (props) => {
  const {
    title,
    imageLinks: { thumbnail },
  } = props;

  return (
    <div className="mb-2 image-container">
      <img
        className="img-fluid book-image animate__animated animate__fadeIn"
        src={thumbnail}
        alt={title}
      />
    </div>
  );
};

export default Thumbnail;
