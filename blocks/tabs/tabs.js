<<<<<<< HEAD
function openTab(evt) {
  evt.preventDefault();
  const tabId = Number(evt.target.dataset.tabId);
  // Get all elements with class="tabcontent" and hide them
  const tabcontents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabcontents.length; i += 1) {
    if (i === tabId) {
      tabcontents[i].style.display = 'block';
    } else {
      tabcontents[i].style.display = 'none';
    }
  }
  return false;
}

export default function decorate(block) {
  const tabLinks = [];
  const tabLinksDiv = document.createElement('div');
  tabLinksDiv.classList.add('tab-links');

  const tabContentsDiv = document.createElement('div');
  tabContentsDiv.classList.add('tab-contents');

  let idx = 0;
  block.querySelectorAll(':scope>div').forEach((row) => {
=======
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
  const tabLinksUL = document.createElement('ul');
  tabLinksDiv.appendChild(tabLinksUL);
  tabLinksDiv.classList.add('tabs-links');

  const tabContentsDiv = document.createElement('div');
  tabContentsDiv.classList.add('tabs-contents');

  tabsBlock.querySelectorAll(':scope>div').forEach((row) => {
>>>>>>> 925acc11979270a411d0178ae3835c8474550e22
    const rowLinkDiv = row.querySelectorAll(':scope>div')[0];
    const rowContentDiv = row.querySelectorAll(':scope>div')[1];
    const rowLinkTxt = rowLinkDiv.textContent;

    const rowLink = document.createElement('a');
    rowLink.setAttribute('href', '_');
    rowLink.textContent = rowLinkTxt;
<<<<<<< HEAD
    rowLink.setAttribute('data-tab-id', idx);
    idx += 1;
    rowLink.addEventListener('click', openTab);

    const tabLinkDiv = document.createElement('div');
    tabLinkDiv.appendChild(rowLink);
    tabLinksDiv.appendChild(tabLinkDiv);

    tabLinks.push(row);

    rowContentDiv.style.display = 'none';
    rowContentDiv.classList.add('tab-content');
    tabContentsDiv.appendChild(rowContentDiv);
  });
  tabContentsDiv.firstChild.style.display = 'block';
  block.innerHTML = '';
  block.appendChild(tabLinksDiv);
  block.appendChild(tabContentsDiv);
  return block;
=======
    rowLink.setAttribute('id', rowLinkTxt);
    rowLink.setAttribute('aria-selected', false);
    rowLink.addEventListener('click', openTab);

    const tabLinkLI = document.createElement('li');
    tabLinkLI.appendChild(rowLink);
    tabLinksUL.appendChild(tabLinkLI);

    rowContentDiv.setAttribute('aria-hidden', true);
    rowContentDiv.setAttribute('aria-labelledby', rowLinkTxt);
    rowContentDiv.classList.add('tabs-content');
    tabContentsDiv.appendChild(rowContentDiv);
  });

  // Display the first tab by default
  tabContentsDiv.firstChild.setAttribute('aria-hidden', false);
  tabLinksUL.querySelector('a').setAttribute('aria-selected', true);

  tabsBlock.innerHTML = '';
  tabsBlock.appendChild(tabLinksDiv);
  tabsBlock.appendChild(tabContentsDiv);
>>>>>>> 925acc11979270a411d0178ae3835c8474550e22
}
