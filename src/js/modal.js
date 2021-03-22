import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const enlargedImage = `<img src= ${event.target.dataset.source}>`;
  const instance = basicLightbox.create(enlargedImage);
  instance.show();
}

export { onOpenModal };