/* eslint-disable linebreak-style */
export default class Validator {
  static isNumber(inputValue) {
    return /^\d+$/.test(inputValue.trim());
  }

  static isValidLength(inputValue) {
    return inputValue.trim().length >= 13 && inputValue.trim().length <= 19;
  }

  static isValidNumber(inputValue) {
    let sum = 0;

    for (let i = 0; i < inputValue.length; i += 1) {
      let cardNum = parseInt(inputValue[i], 10);

      if ((inputValue.length - i) % 2 === 0) {
        cardNum *= 2;

        if (cardNum > 9) {
          cardNum -= 9;
        }
      }

      sum += cardNum;
    }

    return sum % 10 === 0;
  }

  static getCardName(value, cards) {
    const filteredCard = cards
      .filter((card) => card.codes.includes(+value))[0];

    if (!filteredCard) {
      return;
    }
    // eslint-disable-next-line   consistent-return
    return filteredCard.name;
  }
}
