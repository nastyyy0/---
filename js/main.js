document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');
  const dotsNav = document.querySelector('.carousel-nav');

  let currentIndex = 0;

  // Создаём индикаторы
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-indicator');
    if (index === 0) dot.classList.add('current-slide');
    dotsNav.appendChild(dot);
  });
  const dots = Array.from(dotsNav.children);

  // Получаем ширину слайда + отступ
  const slideStyle = getComputedStyle(slides[0]);
  const slideWidth = slides[0].offsetWidth + parseInt(slideStyle.marginRight);

  // Располагаем слайды
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
  });

  // Перемещение к слайду
  const moveToSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('current-slide'));
    dots.forEach(dot => dot.classList.remove('current-slide'));

    slides[index].classList.add('current-slide');
    dots[index].classList.add('current-slide');

    track.style.transform = `translateX(-${slides[index].style.left})`;
  };

  // Клик "вперёд"
  nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= 2) {
      currentIndex = 0; // сразу переход к первому
    }
    moveToSlide(currentIndex);
  });

  // Клик "назад"
  prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 4; // переход к последнему
    }
    moveToSlide(currentIndex);
  });

  // Клик по точке
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const targetIndex = dots.findIndex(dot => dot === targetDot);
    currentIndex = targetIndex;
    moveToSlide(currentIndex);
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.review-track');          // контейнер со слайдами
  const slides = Array.from(track.children);                      // все отзывы
  const prevButton = document.querySelector('.review-btn.prev');  // кнопка "назад"
  const nextButton = document.querySelector('.review-btn.next');  // кнопка "вперёд"

  let currentIndex = 0;

  // Функция смены слайда
  const moveToSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('current-slide'));
    slides[index].classList.add('current-slide');
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  // Клик "вперёд"
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;  // если последний → вернуться к первому
    moveToSlide(currentIndex);
  });

  // Клик "назад"
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;  // если первый → перейти к последнему
    moveToSlide(currentIndex);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('userForm');

  // Открытие модального окна
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });

  // Закрытие по крестику
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закрытие по клику вне окна
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Обработка формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    console.log('Имя:', data.get('name'));
    console.log('Телефон:', data.get('phone'));
    modal.style.display = 'none';
    form.reset();
  });
});
