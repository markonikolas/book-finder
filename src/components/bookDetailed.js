import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../helpers/helpers';

const BookDetailed = () => {
  const { id } = useParams();

  return (
    <div className="container-fluid">
      <img src="" alt="" />
      <h1>{id}</h1>
    </div>
  );
};

export default BookDetailed;
