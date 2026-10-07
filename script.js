const dialog = document.querySelector('.video-dialog');
const player = dialog.querySelector('video');
const title = dialog.querySelector('#dialog-title');
const closeButton = dialog.querySelector('.dialog-close');
let previousFocus = null;

document.querySelectorAll('[data-video]').forEach((button) => {
  button.addEventListener('click', () => {
    previousFocus = button;
    title.textContent = button.dataset.title;
    dialog.classList.toggle('portrait', button.dataset.orientation === 'portrait');
    player.poster = button.querySelector('img').src;
    player.src = button.dataset.video;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    player.play().catch(() => {});
    closeButton.focus();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  player.pause();
  player.removeAttribute('src');
  player.load();
  document.body.classList.remove('dialog-open');
  previousFocus?.focus();
});
