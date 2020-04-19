import axios from 'axios';

const getData = async (query) => {
  const response = await axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((bookDetails) => bookDetails.data.items);
  return response;
};

export { getData };
