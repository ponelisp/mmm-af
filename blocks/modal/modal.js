/* eslint-disable import/no-cycle */
import {
  buildBlock,
  decorateBlock,
  loadBlock,
} from '../../scripts/scripts.js';
import {
  loadFragment,
} from '../fragment/fragment.js';

function openModal(block) {
  loadBlock(block);
  block.classList.add('appear');
  document.body.style.overflow = 'hidden';
}

function closeModal(block) {
  if (block.classList.contains('appear')) {
    block.classList.remove('appear');
    document.body.style.removeProperty('overflow');
    // reset window.location.hash
    const url = new URL(window.location);
    url.hash = '';
    window.history.pushState({}, '', url.toString());
  }
}

export function getModalId(url, prefix = '#') {
  return new URL(url).hash.replace(prefix, '');
}

export function getModal(id, main = document) {
  return main.querySelector(`.modal[data-id="${id}"]`);
}

export function autoBlockModal(link, prefix) {
  const id = getModalId(link.href, prefix);
  let modal = getModal(id);
  if (!modal) {
    // auto-create modal block
    modal = buildBlock('modal', []);
    modal.dataset.id = id;
    const modalWrapper = document.createElement('div');
    modalWrapper.append(modal);
    const section = link.closest('.section');
    section.append(modalWrapper);
    decorateBlock(modal);
  }
  // add modal trigger
  link.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(modal);
  });
  // automatically show modal if window.location.hash contains id
  function checkWindow() {
    const checkId = getModalId(window.location.href, prefix);
    if (checkId === id) {
      openModal(modal);
    } else {
      closeModal(modal);
    }
  }
  checkWindow();
  window.addEventListener('popstate', () => {
    checkWindow();
  });
}

export default async function decorate(block) {
  if (block.innerHTML === '') {
    // fetch modal content
    const modalContent = await loadFragment(`/modals/${block.dataset.id}`);
    block.innerHTML = modalContent.innerHTML;
    // prevent clicks on modal from propagating to the document
    block.addEventListener('click', (e) => e.stopPropagation());
    // add close button
    const modalCloseBtn = document.createElement('a');
    modalCloseBtn.textContent = 'Close';
    modalCloseBtn.href = '#';
    modalCloseBtn.className = 'button primary modal-close';
    modalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(block);
    });
    block.append(modalCloseBtn);
    // add close listeners
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        closeModal(block);
      }
    });
    document.addEventListener('click', () => {
      closeModal(block);
    });
  }
}
