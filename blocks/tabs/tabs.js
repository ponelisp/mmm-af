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
    const rowLinkDiv = row.querySelectorAll(':scope>div')[0];
    const rowContentDiv = row.querySelectorAll(':scope>div')[1];
    const rowLinkTxt = rowLinkDiv.textContent;

    const rowLink = document.createElement('a');
    rowLink.setAttribute('href', '_');
    rowLink.textContent = rowLinkTxt;
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
}
