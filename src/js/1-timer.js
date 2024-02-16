// Підключені бібліотеки flatpickr та iziToast.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import 'izitoast/dist/css/iziToast.min.css';

const allComponents = {
  btn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;

// При першому завантаженні сторінки кнопка Start не активна.

allComponents.btn.disabled = true;

// Обробник зміни дати в інпуті

allComponents.btn.addEventListener('change', event => {
  userSelectedDate = new Date(event.target.value);

  if (userSelectedDate <= new Date()) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future',
    });
    allComponents.btn.disabled = true;
  } else {
    allComponents.btn.disabled = false;
  }
});

// Обробник натискання на кнопку Start

allComponents.btn.addEventListener('click', () => {
  allComponents.btn.disabled = true;
  allComponents.input.disabled = true;
  startTimer();
});

// Клас для таймера
class Timer {
  constructor(onTick) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start(targetDate) {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const remainingTime = targetDate - now;

      if (remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.onTick(0);
        iziToast.success({
          title: 'Success',
          message: 'Timer has ended!',
        });
      } else {
        this.onTick(remainingTime);
      }
    }, 1000);
  }
}

// Функція початку таймера
function startTimer() {
  const targetDate = userSelectedDate.getTime();
  const timer = new Timer(onTick);
  timer.start(targetDate);
}

// Функція оновлення інтерфейсу таймера
function onTick(remainingTime) {
  const timeObj = convertMs(remainingTime);
  const formattedTime = addLeadingZero(timeObj);
  allComponents.days.textContent = formattedTime.days;
  allComponents.hours.textContent = formattedTime.hours;
  allComponents.minutes.textContent = formattedTime.minutes;
  allComponents.seconds.textContent = formattedTime.seconds;
}

function timerSet() {
  const date = new Date();
  const timeLeft = userSelectedDate - date;

  if (timeLeft <= 0) {
    stopTimer();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

// Функція форматування чисел з додаванням лідируючих нулів
function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
}

// Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    allComponents.btn.disabled = false;
  },
};

// Ініціалізація flatpickr
flatpickr(allComponents.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
