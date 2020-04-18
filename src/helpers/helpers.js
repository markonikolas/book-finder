import axios from 'axios';

async function getData(input) {
  const resp = await axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
    .then((res) => res.data.items);
  return resp;
}

export { getData };
