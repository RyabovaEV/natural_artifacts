import Validate from "./Validate.js";

class CheckForm {
  static SELECTORS = {
    form: '[data-js-contact-form]',
    inputName: '[data-js-contact-form-input-name]',
    inputEmail: '[data-js-contact-form-input-email]',
    button: '[data-js-contact-form-btn]'
  }

  constructor() {
    this.formElement = document.querySelector(CheckForm.SELECTORS.form)
    if (!this.formElement) return
    this.inputNameElement = this.formElement.querySelector(CheckForm.SELECTORS.inputName)
    this.inputEmailElement = this.formElement.querySelector(CheckForm.SELECTORS.inputEmail)
    this.inputBtnElement = this.formElement.querySelector(CheckForm.SELECTORS.button)

    this.validator = new Validate(this.formElement);
    this.bindEvents()
  }

  bindEvents() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const isValid = this.validator.checkFormValidity();

      if (isValid) {
        console.log("Форма валидна");

        this.formElement.reset();
        this.validator.clearErrors?.()

      } else {
        console.warn("Форма содержит ошибки");
      }

    })
  }
}

export default CheckForm