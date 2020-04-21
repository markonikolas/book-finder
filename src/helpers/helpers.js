import axios from 'axios';

const getData = async (query) => {
  const response = await axios
    .get(`https://www.googleapis.com/books/v1/volumes?q="${query}"`)
    .then((bookDetails) => bookDetails.data.items)
    .then((res) =>
      res.map((volume) => {
        const volumeData = { id: volume.id, data: volume.volumeInfo };
        return volumeData;
      }),
    );
  return response;
};

const webStorageSupport = () => {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    console.log('Sorry, No localStorage Support.');
    return false;
  }
};

export { getData, webStorageSupport };
