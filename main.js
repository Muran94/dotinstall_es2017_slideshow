'use strict';

{
  // Elements
  const $mainImage = document.getElementById('main-image');
  const $playButton = document.getElementById('play');
  const $pauseButton = document.getElementById('pause');
  const $prevButton = document.getElementById('prev');
  const $nextButton = document.getElementById('next');
  const $thumbnails = document.querySelector('.thumbnails');

  // 定数
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  // 変数
  let currentImageIndex = 0;
  let timeoutId;

  // 関数
  function addCurrentClass() {
    document.querySelectorAll('.thumbnail')[currentImageIndex].classList.add('thumbnail__current');
  }

  function removeCurrentClass() {
    document.querySelector('.thumbnail__current').classList.remove('thumbnail__current');
  }

  function toggleCurrentThumbnail() {
    removeCurrentClass();
    addCurrentClass();
  }

  function togglePlayPauseButtons() {
    $playButton.classList.toggle("controls__button--hidden");
    $pauseButton.classList.toggle("controls__button--hidden");
  }

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      $nextButton.click();
      playSlideshow();
    }, 1000);
  }

  function setMainImage(image) {
    $mainImage.src = image;
  }

  function setThumbnails() {
    images.forEach((image, index) => {
      // Create elements.
      const $li  = document.createElement('li');
      const $img = document.createElement('img');

      // Set required attributes.
      $li.classList.add('thumbnail');
      if (index === currentImageIndex) {
        $li.classList.add('thumbnail__current');
      }
      $img.classList.add('thumbnail__image');
      $img.src = image;

      // Add events.
      $li.addEventListener('click', () => {
        currentImageIndex = index;
        toggleCurrentThumbnail();
        setMainImage(image);
      });

      // Implement elements
      $li.appendChild($img);
      $thumbnails.appendChild($li);
    });
  };

  $playButton.addEventListener('click', () => {
    togglePlayPauseButtons();
    playSlideshow();
  });

  $pauseButton.addEventListener('click', () => {
    togglePlayPauseButtons();
    clearTimeout(timeoutId);
  });

  $nextButton.addEventListener('click', () => {
    currentImageIndex = currentImageIndex === (images.length - 1) ? 0 : currentImageIndex + 1;
    toggleCurrentThumbnail();
    setMainImage(images[currentImageIndex]);
  });

  $prevButton.addEventListener('click', () => {
    currentImageIndex = currentImageIndex === 0 ? (images.length - 1) : currentImageIndex - 1;
    toggleCurrentThumbnail();
    setMainImage(images[currentImageIndex]);
  });

  setMainImage(images[currentImageIndex]);
  setThumbnails();
}
