// У файлі render-functions.js створи функції для відображення елементів інтерфейсу (додавання/оновлення елементів галереї, відображення лоедера).

//create gallery element

const gallery = document.querySelector('.gallery');

export function createGalleryMarkup(images) {
  gallery.innerHTML = images
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
    .join('');
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

// create loader
