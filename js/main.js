document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);

  const slideWidth = slides[0].getBoundingClientRect().width + 20;

  // Клонируем первый и последний слайды
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(track.children);

  // Располагаем слайды
  allSlides.forEach((slide, index) => {
    slide.style.left = (slideWidth * index) + 'px';
  });

  let currentIndex = 1; // начинаем с первого настоящего слайда
  let isMoving = false;

  allSlides[currentIndex].classList.add('current-slide');
  track.style.transform = 'translateX(-' + allSlides[currentIndex].style.left + ')';

  const handleRemainingSlides = () => {
    const remaining = allSlides.length - currentIndex - 1;
    if (remaining <= 5) {
      track.classList.add('show-last-slides');
      console.log('Осталось 5 или меньше слайдов!');
    } else {
      track.classList.remove('show-last-slides');
    }
  };

  const moveToSlide = (targetIndex) => {
    if (isMoving) return;
    isMoving = true;

    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = allSlides[targetIndex];

    track.style.transition = 'transform 0.5s ease';
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    currentIndex = targetIndex;

    handleRemainingSlides();
  };

  const updateDots = (targetIndex) => {
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = dots[(targetIndex - 1 + slides.length) % slides.length];
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  };

  nextButton.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
    updateDots(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
    updateDots(currentIndex - 1);
  });

  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const targetIndex = dots.findIndex(dot => dot === targetDot) + 1;
    moveToSlide(targetIndex);
    updateDots(targetIndex);
  });

  track.addEventListener('transitionend', () => {
    if (allSlides[currentIndex].classList.contains('clone')) {
      track.style.transition = 'none';

      if (currentIndex === 0) {
        currentIndex = slides.length;
      } else if (currentIndex === allSlides.length - 1) {
        currentIndex = 1;
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transform = 'translateX(-' + allSlides[currentIndex].style.left + ')';
          allSlides.forEach(slide => slide.classList.remove('current-slide'));
          allSlides[currentIndex].classList.add('current-slide');
          isMoving = false;
          handleRemainingSlides(); // повторная проверка после перехода
        });
      });
    } else {
      isMoving = false;
    }
  });

  // Автопрокрутка (по желанию)
  // setInterval(() => {
  //   if (!isMoving) {
  //     moveToSlide(currentIndex + 1);
  //     updateDots(currentIndex + 1);
  //   }
  // }, 4000);
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.review-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.review-btn.prev');
  const nextButton = document.querySelector('.review-btn.next');

  let currentIndex = 0;

  // функция переключения
  const moveToSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('current-slide'));
    slides[index].classList.add('current-slide');
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  // кнопка вперёд
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length; // после последнего — первый
    moveToSlide(currentIndex);
  });

  // кнопка назад
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // до первого — последний
    moveToSlide(currentIndex);
  });
});
