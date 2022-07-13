function addFaqEventListeners(block) {
  block.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', toggleFaq);
    question.addEventListener('keydown', event => {
      if (event.keyCode === 32 || event.keyCode === 13 ) {
        toggleFaq(event);
      }
    });
  });
}

function toggleFaq(e) {
  const faq = e.target.parentElement;
  console.log(faq);
  closeAllOtherFaqs(faq);
  faq.classList.toggle('active');
}

function closeAllOtherFaqs(faq) {
  const accs = document.getElementsByClassName('faq-accordion');
  for (let i = 0; i < accs.length; i++) {
    if (accs[i] == faq) {
      continue;
    }
    if (accs[i].classList.contains('active')) {
      accs[i].classList.remove('active');
    }
  }
}

export default function decorate(block) {
  const faqs = [];
  const rows = Array.from(block.children);
  rows.forEach((row) => {
    const cells = Array.from(row.children);
    const question = cells[0] && cells[0].textContent;
    const answer = cells[1] && cells[1].innerHTML;
    faqs.push({
      question, answer,
    });
  });

  block.innerHTML = '';
  faqs.forEach((faq, i) => {
    const { question, answer } = faq;

    const accordion = document.createElement('div');
    accordion.className = 'faq-accordion';
    block.append(accordion);

    const questionDiv = document.createElement('div');
    questionDiv.className = 'faq-question';
    accordion.append(questionDiv);
    questionDiv.innerHTML = question;

    const chevron = document.createElement('i');
    chevron.className = 'chevron';
    questionDiv.append(chevron);

    const answerDiv = document.createElement('div');
    answerDiv.className = 'faq-answer';
    accordion.append(answerDiv);
    answerDiv.innerHTML = answer;

    if (i === 0) {
      accordion.classList.add('active');
    }
  });

  addFaqEventListeners(block);
}
