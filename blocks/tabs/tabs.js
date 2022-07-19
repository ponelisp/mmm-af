/*
Displays the 'clicked' tab and hides all other tabs
*/
function openTab(e) {
  e.preventDefault();
  const { target } = e;
  const parent = target.closest('.tabs');
  const selected = target.getAttribute('aria-selected') === 'true';
  if (!selected) {
    // close all open tabs
    const openTitles = parent.querySelectorAll('[aria-selected="true"]');
    const openContent = parent.querySelectorAll('[aria-hidden="false"]');
    openTitles.forEach((tab) => tab.setAttribute('aria-selected', false));
    openContent.forEach((tab) => tab.setAttribute('aria-hidden', true));
    // open clicked tab
    target.setAttribute('aria-selected', true);
    const content = parent.querySelector(`[aria-labelledby="${target.id}"]`);
    content.setAttribute('aria-hidden', false);
  }
}

export default function decorate(tabsBlock) {
  const tabLinksDiv = document.createElement('div');
  const tabLinksOL = document.createElement('ol');
  tabLinksDiv.appendChild(tabLinksOL);
  tabLinksDiv.classList.add('tabs-links');

  const tabContentsDiv = document.createElement('div');
  tabContentsDiv.classList.add('tabs-contents');

  tabsBlock.querySelectorAll(':scope>div').forEach((row) => {
    const rowLinkDiv = row.querySelectorAll(':scope>div')[0];
    const rowContentDiv = row.querySelectorAll(':scope>div')[1];
    const rowLinkTxt = rowLinkDiv.textContent;

    const rowLink = document.createElement('a');
    rowLink.setAttribute('href', '_');
    rowLink.textContent = rowLinkTxt;
    rowLink.setAttribute('id', rowLinkTxt);
    rowLink.setAttribute('aria-selected', false);
    rowLink.addEventListener('click', openTab);

    const tabLinkLI = document.createElement('li');
    tabLinkLI.appendChild(rowLink);
    tabLinksOL.appendChild(tabLinkLI);

    rowContentDiv.setAttribute('aria-hidden', true);
    rowContentDiv.setAttribute('aria-labelledby', rowLinkTxt);
    rowContentDiv.classList.add('tabs-content');
    tabContentsDiv.appendChild(rowContentDiv);
  });

  // Display the first tab by default
  tabContentsDiv.firstChild.setAttribute('aria-hidden', false);
  tabLinksOL.querySelector('a').setAttribute('aria-selected', true);

  tabsBlock.innerHTML = '';
  tabsBlock.appendChild(tabLinksDiv);
  tabsBlock.appendChild(tabContentsDiv);
}
