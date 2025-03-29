import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { responseData } from './js/pixabay-api';
import {
  createGalleryMarkup,
  clearGallery,
  initLightbox,
} from './js/render-functions';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.js-button');

let query = '';
let currentPage = 1;
let totalHits = 0; // Глобальная переменная для общего количества изображений

let lightbox = initLightbox(); // Инициализация SimpleLightbox

form.addEventListener('submit', userInputForm);
loadButton.addEventListener('click', loadMoreImage);

async function userInputForm(event) {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  loader.classList.remove('hidden');
  clearGallery();
  form.reset();
  currentPage = 1;

  try {
    const { hits, totalHits: fetchedTotalHits } = await responseData(
      query,
      currentPage
    );

    // Логирование всей структуры ответа
    console.log('API Response:', { hits, totalHits: fetchedTotalHits });

    // Проверка на отсутствие данных
    if (!hits || hits.length === 0) {
      iziToast.error({
        title: 'Sorry',
        message: 'No images found, please try another search.',
        position: 'topRight',
      });
      loadButton.classList.add('hidden');
      return;
    }

    // Обновляем глобальное количество изображений
    totalHits = fetchedTotalHits;

    // Отображаем изображения
    createGalleryMarkup(hits, lightbox); // Передаем lightbox в функцию для обновления
    lightbox.refresh(); // Обновление lightbox

    // Прокручиваем страницу к первому новому изображению
    scrollToFirstNewImage(hits);

    if (Math.ceil(totalHits / 15) === currentPage) {
      iziToast.show({
        title: 'End of search',
        message: 'You have reached the end of the collection.',
        position: 'topRight',
      });
      loadButton.classList.add('hidden');
    } else {
      loadButton.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
}

async function loadMoreImage() {
  if (currentPage * 15 < totalHits) {
    loader.classList.remove('hidden');
    currentPage += 1;

    try {
      const { hits } = await responseData(query, currentPage);

      console.log('Hits on load more:', hits);

      // Проверка на пустой ответ
      if (hits && hits.length > 0) {
        createGalleryMarkup(hits, lightbox); // Передаем lightbox для обновления
        lightbox.refresh(); // Обновление lightbox

        // Прокручиваем страницу к первому новому изображению
        scrollToFirstNewImage(hits);
      } else {
        console.warn('No more images found.');
      }

      if (Math.ceil(totalHits / 15) === currentPage) {
        iziToast.show({
          title: 'End of search',
          message: 'You have reached the end of the collection.',
          position: 'topRight',
        });
        loadButton.classList.add('hidden');
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `Something went wrong: ${error.message}`,
        position: 'topRight',
      });
    } finally {
      loader.classList.add('hidden');
    }
  }
}

// Функция для прокрутки страницы к первому новому изображению
function scrollToFirstNewImage(hits) {
  // Находим первое изображение, которое было добавлено на текущей странице
  const firstNewImage = gallery.querySelector(
    '.gallery-item:nth-last-child(' + hits.length + ')'
  ); // Берем первое добавленное изображение
  if (firstNewImage) {
    firstNewImage.scrollIntoView({
      behavior: 'smooth', // Плавная прокрутка
      block: 'start', // Прокрутка до начала элемента
    });
  }
}
