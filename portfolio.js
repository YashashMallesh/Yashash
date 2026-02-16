(function () {
  const root = document.querySelector('.slider-parallax');
  const slides = Array.from(root.querySelectorAll('.p-slide'));
  const btnPrev = root.querySelector('.p-prev');
  const btnNext = root.querySelector('.p-next');
  const currentSpan = root.querySelector('.p-current');
  const totalSpan = root.querySelector('.p-total');

  let index = 0;
  let busy = false;

  totalSpan.textContent = String(slides.length).padStart(2, '0');
  updateCounter();

  function updateCounter() {
    currentSpan.textContent = String(index + 1).padStart(2, '0');
  }

  function go(dir) {
    if (busy) return;
    busy = true;

    const oldIndex = index;
    index = (index + dir + slides.length) % slides.length;

    const oldSlide = slides[oldIndex];
    const newSlide = slides[index];

    const leaveClass = dir === 1 ? 'leave-left' : 'leave-right';

    oldSlide.classList.remove('active');
    oldSlide.classList.add(leaveClass);
    newSlide.classList.add('active');

    updateCounter();

    setTimeout(() => {
      oldSlide.classList.remove(leaveClass);
      busy = false;
    }, 750);
  }

  btnNext.addEventListener('click', () => go(1));
  btnPrev.addEventListener('click', () => go(-1));
})();
