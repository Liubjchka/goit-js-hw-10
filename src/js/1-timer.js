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

// При першому завантаженні сторінки кнопка Start не активна.

allComponents.btn.disabled = true;

allComponents.btn.addEventListener('click', () => {
  if (userSelectedDate) {
    allComponents.btn.disabled = true;
    allComponents.input.disabled = true;
    startTimer();
  }
});

// Кожну секунду оновлюється інтерфейс і показує оновлені дані часу, який залишився.
class Timer {
  constructor(tick) {
    this.intervalId = null;
    this.tick = tick;
  }

  start() {
    const init = Date.now();

    this.intervalId = setInterval(() => {
      const dif = Date.now() - init;
      const time = this.msToTime(dif);
      console.log(time);
    }, 1000);
  }
}

//=============
let userSelectedDate;

allComponents.input.addEventListener('change', event => {
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

//===============
function startTimer() {
  const targetDate = userSelectedDate.getTime();

  const timer = new Timer(remainingTime => {
    if (remainingTime <= 0) {
      clearInterval(timer.intervalId);
      onTick(0);
      iziToast.success({
        title: 'Success',
        message: 'Timer has ended!',
      });
    } else {
      onTick(remainingTime);
    }
  });

  timer.start(targetDate);
}

//=======
const timer = new Timer(onTick);

allComponents.btn.addEventListener('click', () => {
  timer.start();
});

// function onTick(time) {
//   const str = convertMs(time);
//   allComponents.input.textContent = str;
//   console.log(str);
// }
function onTick(remainingTime) {
  const timeObj = convertMs(remainingTime);
  const formattedTime = addLeadingZero(timeObj);
  allComponents.input.textContent = formattedTime;
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(4, '0');
  hours = hrs.toString().padStart(2, '0');
  minutes = mins.toString().padStart(2, '0');
  seconds = secs.toString().padStart(2, '0');

  return `${days}:${hours}:${minutes}:${seconds}`;
}

iziToast.show({
  title: 'Hey',
  message: 'What would you like to add?',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

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
