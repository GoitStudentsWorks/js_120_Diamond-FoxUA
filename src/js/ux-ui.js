import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
  });
}

export function showInfo(message) {
  iziToast.info({
    message,
    position: 'topRight',
  });
}

export function showWarning(message) {
  iziToast.warning({
    message,
    position: 'topRight',
  });
}
