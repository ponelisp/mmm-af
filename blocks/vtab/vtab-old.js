export default function decorate(block) {
    // const linksWrapper = block.querySelectorAll(':scope>.vtab-links-wrapper');
    // const contentWrapper = block.querySelectorAll(':scope>.vtab-content-wrapper');
    // const vTab = document.createElement('div');
    // linksWrapper.remove();
    // contentWrapper.remove();
    // vTab.appendChild(linksWrapper);
    // vTab.appendChild(contentWrapper);
    // block.appendChild(vTab);


    const textAndImgDivs = [];
    linksDiv.classList.add('vtab');
    block.querySelectorAll(':scope>div').forEach((row) => {
        const rowLinkDiv = row.querySelectorAll(':scope>div')[0];
        const rowTxtDiv = row.querySelectorAll(':scope>div')[1];
        const rowImgDiv = row.querySelectorAll(':scope>div')[2];

        const btn = document.createElement('button');
        btn.classList.add('vtablinks');
        btn.addEventListener('click', () => {
            openVtab(event, rowLinkDiv.textContent);
        });
        btn.textContent = rowLinkDiv.textContent;
        linksDiv.appendChild(btn);

        const textAndImgDiv = document.createElement('div');
        textAndImgDiv.classList.add("vtabcontent");

        textAndImgDiv.id = rowLinkDiv.textContent;
        textAndImgDiv.style.display = "none";
        textAndImgDiv.appendChild(rowTxtDiv);
        textAndImgDiv.appendChild(rowImgDiv);

        textAndImgDivs.push(textAndImgDiv);
    });
    block.textContent = '';
    block.appendChild(linksDiv);
    textAndImgDivs.forEach((textAndImgDiv) => {
        block.appendChild(textAndImgDiv);
    });
    textAndImgDivs[0].style.display = "flex";

}

function openVtab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("vtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("vtablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "flex";
    evt.currentTarget.className += " active";
}