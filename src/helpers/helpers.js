import axios from 'axios';
/* possibly bad practice to pass state to external helper function */
async function getData(input) {
  const resp = await axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
    .then((res) => res.data.items);
  return resp;
}

export { getData };
