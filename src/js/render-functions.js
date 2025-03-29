// Імпортуємо SimpleLightbox і його стилі
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

// Ініціалізація SimpleLightbox
export function initLightbox() {
  return new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    animationSpeed: 350,
  });
}

// Функція для створення розмітки галереї
export function createGalleryMarkup(images, lightbox) {
  // Перевіряємо, чи є валідні зображення
  const validImages = images.filter(image => {
    return image.largeImageURL && image.webformatURL && image.tags; // Перевірка на наявність необхідних даних
  });

  // Якщо є валідні зображення, додаємо їх в галерею
  if (validImages.length > 0) {
    gallery.insertAdjacentHTML(
      'beforeend',
      validImages
        .map(
          image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-image"
          src="${image.webformatURL}"
          data-source="${image.largeImageURL}"
          alt="${image.tags}"
        />
      </a>
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads:  ${image.downloads}</p>
    </li>`
        )
        .join('')
    );

    // Оновлюємо SimpleLightbox після рендерингу нових зображень
    if (lightbox) {
      lightbox.refresh(); // Оновлення інстансу SimpleLightbox для нових елементів
    }
  } else {
    console.warn('No valid images to render.');
  }
}

// Функція для очищення галереї
export function clearGallery() {
  gallery.innerHTML = '';
}
