import './styles.css';
import PixabayApiService from './js/apiService';
import galleryCardTpl from './template/gallery-card.hbs';
import { refs } from './js/references';

import { alert } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { onOpenModal } from './js/modal';

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onOpenModal);

function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  pixabayApiService.query = form.elements.query.value;

  if (pixabayApiService.query === '') {
    alert({
      text: 'Please enter a word!',
    });
    return;
  }

  if (pixabayApiService.query.trim().length === 0) {
    alert({
      text: 'Please enter a more specific query!',
    });
    return;
  }

  pixabayApiService.resetPage();
  pixabayApiService.fetchArticles().then(data => {
    clearGallery();
    appendGalleryMarkup(data);
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function appendGalleryMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryCardTpl(data));
}

const options = {
  rootMargin: '150px',
  threshold: 0.05,
};

const onEntry = entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || pixabayApiService.query === '') {
      return;
    }
    pixabayApiService.fetchArticles().then(data => {
      appendGalleryMarkup(data);
    });
  });
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.scroll);