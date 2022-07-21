export default function decorate(block) {
    const imgDiv = document.createElement('div');
    const itemsDiv = document.createElement('div');

    block.querySelectorAll(':scope>div').forEach((row, idx) => {
        if(idx === 0) {
            const pic = row.querySelectorAll('picture')[0];
            imgDiv.appendChild(pic);
        } else {
            row.classList.add("image-table-row");
            const iconDiv = row.querySelectorAll(':scope>div')[0];
            iconDiv.classList.add('icon-box');

            const textDiv = row.querySelectorAll(':scope>div')[1];
            textDiv.classList.add('text-box');
            itemsDiv.appendChild(row);
        }
    });
    block.innerHTML = '';
    block.appendChild(imgDiv);
    block.appendChild(itemsDiv);
}