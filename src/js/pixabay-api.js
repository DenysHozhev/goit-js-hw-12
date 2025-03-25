// У файлі pixabay-api.js зберігай функції для HTTP-запитів.

// Підключення бібліотеки Аxios
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function responseData(
  requestWords,
  additionalParams = {},
  page = 1
) {
  const reqestParams = {
    key: '49272449-54e018c7c1ace9d1b8dfc3596',
    q: requestWords,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
    ...additionalParams,
  };
  try {
    const response = await axios.get('', {
      params: reqestParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error);
    throw error;
  }
}

// Скидаємо значення сторінки до 1
export function resetPage() {
  currentPage = 1;
}
