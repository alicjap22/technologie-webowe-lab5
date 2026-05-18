import './style.css';
import dayjs from 'dayjs';

const form = document.querySelector('#birthday-form');
const dialog = document.querySelector('#result-dialog');
const closeBtn = document.querySelector('#close-dialog');
const dialogContent = document.querySelector('#dialog-content');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const bdayInput = document.querySelector('#bday').value;
  if (!bdayInput) return;

  const birthDate = dayjs(bdayInput);
  const today = dayjs();

  const daysPassed = today.diff(birthDate, 'days');
  let message = `<p class="mb-2">Od Twoich narodzin minęło: <strong>${daysPassed}</strong> dni.</p>`;

  const isBirthdayToday = birthDate.date() === today.date() && birthDate.month() === today.month();

  if (isBirthdayToday) {
    message += `<p class="text-lg font-bold">Wszystkiego najlepszego!</p>`;
  } else {
    let nextBirthday = birthDate.year(today.year());
    
    if (nextBirthday.isBefore(today, 'day')) {
      nextBirthday = nextBirthday.add(1, 'year');
    }

    const weeksToNext = nextBirthday.diff(today, 'weeks');
    message += `<p class="mb-2">Do kolejnych urodzin pozostało tygodni: <strong>${weeksToNext}</strong>.</p>`;

    if (weeksToNext === 0) {
      message += `<p class="font-bold">Masz urodziny w tym tygodniu!</p>`;
    }
  }

  dialogContent.innerHTML = message;
  dialog.showModal();
});

closeBtn.addEventListener('click', () => {
  dialog.close();
});