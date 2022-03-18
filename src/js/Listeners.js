/* eslint-disable linebreak-style */
import Validator from './Validator';

export default class Listeners {
  static onSubmit(inputElement, cards, messageBox) {
    const message = messageBox;

    if (!Validator.isNumber(inputElement.value)) {
      message.innerText = 'Entered value is not a number!';
      message.classList.add('error');
      setTimeout(() => message.classList.remove('error'), 2000);
      return;
    }

    if (!Validator.isValidLength(inputElement.value)) {
      message.innerText = 'Entered card number has invalid length!';
      message.classList.add('error');
      setTimeout(() => message.classList.remove('error'), 2000);
      return;
    }

    if (!Validator.isValidNumber(inputElement.value)) {
      message.innerText = 'Card number is invalid!';
      message.classList.add('error');
      setTimeout(() => message.classList.remove('error'), 2000);
      return;
    }

    message.innerText = 'Card number is valid!';
    message.classList.add('valid');
    setTimeout(() => {
      message.classList.remove('valid');
      inputElement.blur();
      Array.from(cards).forEach((card) => card.classList.add('blur'));
    }, 2000);
  }

  static onInput(inputElement, cards, cardsEl) {
    const value = inputElement.value.slice(0, 2);

    if (inputElement.value.length < 2) {
      Array.from(cardsEl).forEach((card) => card.classList.add('blur'));
      return;
    }

    const name = Validator.getCardName(value, cards);

    if (name) {
      Array.from(cardsEl).filter((card) => card.dataset.name === name)[0]
        .classList.remove('blur');
    }
  }
}
