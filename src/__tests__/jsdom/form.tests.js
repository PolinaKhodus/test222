import cardsInfo from '../../js/cardsInfo';
import ValidatorWidget from '../../js/ValidatorWidget';

describe('Card valid form', () => {  
    const widget = new ValidatorWidget(document.body, cardsInfo);
    const input = widget.input;
    const submit = document.querySelector('.validate-btn');
    const msgBox = document.querySelector('.message-box');

  test('should return invalid status', () => {
    input.value = '4561261212345464';
    submit.click();

    expect(msgBox.innerText).toBe('Card number is invalid!');    
  });

  test('should return invalid status', () => {
    input.value = '4561261212345467';
    submit.click();

    expect(msgBox.innerText).toBe('Card number is valid!');    
  });

  test('should return is-not-number status', () => {
    input.value = '';
    submit.click();

    expect(msgBox.innerText).toBe('Entered value is not a number!');    
  });

  test('should return invalid-length status', () => {
    input.value = '123';
    submit.click();

    expect(msgBox.innerText).toBe('Entered card number has invalid length!');    
  });
});
