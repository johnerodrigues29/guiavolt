(() => {
  const main = document.querySelector('[data-gallery-main]');
  const buttons = [...document.querySelectorAll('[data-gallery-src]')];
  if (!main) return;
  function show(button) {
    main.src = button.dataset.gallerySrc;
    main.alt = button.dataset.galleryAlt;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }
  buttons.forEach((button,index) => {
    button.addEventListener('click', () => show(button));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length-1 : (index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
      buttons[next].focus(); show(buttons[next]);
    });
  });
})();
