import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { responseData } from './js/pixabay-api';
import { createGalleryMarkup, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.button');

let totalHits = 0;
let loadedImages = 0;
let query = '';
let currentPage = 1;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 350,
});

form.addEventListener('submit', userInputForm);
button.addEventListener('click', loadMoreImage);

async function userInputForm(event) {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) return;

  loader.classList.remove('hidden');
  clearGallery();
  form.reset();
  loadedImages = 0;
  currentPage = 1;

  try {
    const data = await responseData(query, {}, currentPage);
    const images = data.hits;
    totalHits = data.totalHits;
    loadedImages += images.length;

    if (images.length === 0) {
      iziToast.error({
        title: 'Sorry',
        message: 'No images found, please try another search.',
        position: 'topRight',
      });
      return;
    }

    renderImages(images);
    lightbox.refresh();

    const galleryHeightBefore = gallery.scrollHeight;
    const galleryHeightAfter = gallery.scrollHeight;
    window.scrollBy({
      top: galleryHeightAfter - galleryHeightBefore,
      behavior: 'smooth',
    });

    if (loadedImages >= totalHits) {
      iziToast.show({
        title: 'End of search',
        message: 'You have reached the end of the collection.',
        position: 'topRight',
      });
      button.classList.add('hidden');
    } else {
      button.classList.remove('hidden');
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

function renderImages(images) {
  gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
  lightbox.refresh();
}

async function loadMoreImage() {
  if (loadedImages < totalHits) {
    loader.classList.remove('hidden');
    currentPage += 1;
    try {
      const data = await responseData(query, {}, currentPage);
      const images = data.hits;
      loadedImages += images.length;
      renderImages(images);

      if (loadedImages >= totalHits) {
        iziToast.show({
          title: 'End of search',
          message: 'You have reached the end of the collection.',
          position: 'topRight',
        });
        button.classList.add('hidden');
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
