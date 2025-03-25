// Описаний у документації
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// import function
import { responseData } from './js/pixabay-api';
import { createGalleryMarkup, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

// create SimpleLightbox

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: `alt`,
  captionDelay: 250,
  animationSpeed: 350,
});

form.addEventListener('submit', userInputForm);

function userInputForm(event) {
  event.preventDefault();
  const query = event.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    return;
  }
  loader.classList.remove('hidden');
  clearGallery();
  form.reset();

  responseData(query)
    .then(data => {
      const image = data.hits;
      if (image.length === 0) {
        console.error('No images found for this search query');
        iziToast.error({
          title: 'Sorry',
          message: `Sorry, there are no images matching your search query. Please try again!
`,
          position: 'topRight',
        });
        return;
      }
      createGalleryMarkup(image);
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        title: 'Sorry',
        message: `Sorry, there are no images matching your search query. Please try again!
`,
        position: 'topRight',
      });
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}
