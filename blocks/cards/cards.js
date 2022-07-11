import { createOptimizedPicture } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
        if (block.classList.contains('image')) {
          // add image as background of container
          const img = div.querySelector('picture > img');
          if (img) {
            div.style.backgroundImage = `url(${img.src})`;
            div.querySelector('picture').remove();
          }
          li.prepend(div);
        }
      } else if (div.querySelector('.icon')) {
        div.className = 'cards-card-icon';
      } else {
        div.className = 'cards-card-body';
      }
    });
    if (block.classList.contains('image')) {
      // wrap card body in image container
      const imgContainer = li.querySelector('.cards-card-image');
      if (imgContainer) {
        imgContainer.append(...li.querySelectorAll(':scope > *:not(.cards-card-image'));
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
