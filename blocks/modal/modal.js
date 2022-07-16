/* eslint-disable import/no-cycle */
import {
  buildBlock,
  decorateBlock,
  loadBlock,
  loadFragment,
} from '../../scripts/scripts.js';

export function getModal(id, main = document) {
  return main.querySelector(`.modal[data-path="${id}"]`);
}

function pathToHash(path) {
  const segments = path.split('/');
  return `#${segments.pop()}`;
}

function pushState(hash) {
  const newUrl = new URL(window.location);
  newUrl.hash = hash;
  window.history.pushState({}, `${document.title}${hash ? ' | Modal' : ''}`, newUrl.toString());
}

async function openModal(section, path) {
  let modal = getModal(path);
  if (!modal) {
    // auto-create modal block
    modal = buildBlock('modal', []);
    modal.dataset.path = path;
    const modalWrapper = document.createElement('div');
    modalWrapper.append(modal);
    section.append(modalWrapper);
    decorateBlock(modal);
    await loadBlock(modal);
  }
  const dialog = modal.firstElementChild;
  if (dialog) {
    dialog.showModal();
    dialog.firstElementChild.scrollIntoView();
  }
}

function closeModal(path) {
  const modal = getModal(path);
  if (modal) {
    const dialog = modal.firstElementChild;
    if (dialog && dialog.open) {
      dialog.close();
    }
    pushState('');
  }
}

function handleState(path) {
  if (window.location.hash === pathToHash(path)) {
    openModal(document.querySelector('main .section'), path);
  } else {
    closeModal(path);
  }
}

export function handleModalLink(link) {
  const path = link.getAttribute('href');
  // add modal trigger
  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    pushState(pathToHash(path));
    handleState(path);
  });
  handleState(path);
  window.addEventListener('popstate', () => {
    handleState(path);
  });
}

export default async function decorate(block) {
  if (block.innerHTML === '') {
    // fetch modal content
    const { path } = block.dataset;
    const modalContent = await loadFragment(path);
    const dialog = block.appendChild(document.createElement('dialog'));
    dialog.innerHTML = (modalContent && modalContent.innerHTML) || '';
    // prevent clicks inside modal from propagating to document
    block.addEventListener('click', (e) => e.stopPropagation());
    // add close button
    const modalCloseBtn = document.createElement('a');
    modalCloseBtn.textContent = 'Close';
    modalCloseBtn.href = '#';
    modalCloseBtn.className = 'button primary modal-close';
    modalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(path);
    });
    dialog.append(modalCloseBtn);
    dialog.addEventListener('cancel', () => {
      pushState('');
    });
  }
}
