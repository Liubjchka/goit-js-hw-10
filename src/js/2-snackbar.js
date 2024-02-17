// Підключена бібліотека iziToast.
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//Додаю слухача подій на форму
const references = {
  formEl: document.querySelector('form'),
};

//Оброблюємо сабміт
references.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    const delay = parseInt(references.formEl.elements.delay.value);
    const state = references.formEl.elements.state.value;

    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise.then(handlePromiseSuccess).catch(handlePromiseReject);
}

function handlePromiseSuccess(success) {
  iziToast.success({
    displayMode: 'replace',
    message: success,
    position: 'topRight',
    icon: '',
  });
}

function handlePromiseReject(error) {
  iziToast.error({
    icon: '',
    message: error,
    position: 'topRight',
  });
}

// function createPromise(delay, state) {

// }
