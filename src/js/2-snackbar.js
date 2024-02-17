// Підключена бібліотека iziToast.
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import 'izitoast/dist/css/iziToast.min.css';

//Додаю слухача подій на форму
const references = {
  formEl: document.querySelector('form'),
};

//Оброблюємо сабміт
references.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  createPromise(1000, 'fulfilled').then(onSuccess).catch(onError);
}

//Функція створення промісу
function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    const delay = references.formEl.elements.delay.value;
    const state = references.formEl.elements.state.value;

    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}

function onSuccess(success) {
  iziToast.success({
    displayMode: 'replace',
    message: success,
    position: 'topRight',
    icon: '',
  });
}

function onError(error) {
  iziToast.error({
    icon: '',
    message: error,
    position: 'topRight',
  });
}
