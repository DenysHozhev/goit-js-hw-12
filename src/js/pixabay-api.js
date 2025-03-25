// У файлі pixabay-api.js зберігай функції для HTTP-запитів.

// Підключення бібліотеки Аxios
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export function responseData(requestWords, additionalParams = {}) {
  const reqestParams = {
    key: '49272449-54e018c7c1ace9d1b8dfc3596',
    q: requestWords,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    ...additionalParams,
  };
  return axios
    .get('', {
      params: reqestParams,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}
