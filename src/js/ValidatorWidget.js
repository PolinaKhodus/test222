/* eslint-disable linebreak-style */
import Listeners from './Listeners';

export default class ValidatorWidget {
  constructor(container, cardsList) {
    this.container = container;
    this.cardsList = cardsList;

    this.bindToDOM();

    this.input = this.container.querySelector(this.getInputSelector());
    this.cardsPanel = this.container.querySelector(this.getCardsPanelSelector());
    this.cards = this.cardsPanel.children;
    this.msgBox = this.container.querySelector(this.getMessageSelector());

    this.cardsMarkup(this.cardsPanel);
    this.addListeners();
  }

  async cardsMarkup(cont) {
    let html = '';
    for (const card of this.cardsList) {
      const icon = import(`../img/${card.name}-logo.png`);

      // eslint-disable-next-line  no-await-in-loop
      const result = await icon;
      html += `<img class="card-box blur" src="${result.default}"
          data-name="${card.name}"></img>`;
    }

    // eslint-disable-next-line  no-param-reassign
    cont.innerHTML = html;
  }

  // eslint-disable-next-line  class-methods-use-this
  widgetMurkup() {
    return `
      <form class='form-widget' data-widget="card-form-widget">
        <fieldset>
          <legend>Card Validator </legend>
          <div class="cards-row">
          </div>
          <div class="control-row">
            <label for="number-input">Enter your card number:</label>
            <input id="number-input" class="number-field" type="text">
            <button class="btn validate-btn">Click to validate</button>
            <div class="message-box invalid hidden"></div>
          </div>          
        </fieldset>        
      </form>
    `;
  }

  bindToDOM() {
    this.container.innerHTML = this.widgetMurkup();
  }

  addListeners() {
    const submit = this.container.querySelector(this.getSubmitSelector());
    const input = this.container.querySelector(this.getInputSelector());
    submit.addEventListener('click', (event) => this.onSubmit(event));
    input.addEventListener('input', (event) => this.onInput(event));
  }

  // eslint-disable-next-line  class-methods-use-this
  getSubmitSelector() {
    return '.validate-btn';
  }

  // eslint-disable-next-line  class-methods-use-this
  getInputSelector() {
    return '.number-field';
  }

  // eslint-disable-next-line  class-methods-use-this
  getMessageSelector() {
    return '.message-box';
  }

  // eslint-disable-next-line  class-methods-use-this
  getCardsPanelSelector() {
    return '.cards-row';
  }

  onSubmit(event) {
    event.preventDefault();
    Listeners.onSubmit(this.input, this.cards, this.msgBox);
  }

  onInput() {
    Listeners.onInput(this.input, this.cardsList, this.cards);
  }
}
