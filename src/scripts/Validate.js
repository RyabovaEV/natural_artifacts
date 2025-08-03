class Validate {
  static SELECTORS = {
    errors: '[data-js-from-block-errors]',
  }

  static ERROR_MESSAGES = {
    valueMissing: () => "Пожалуйста, заполните это поле",
    tooLong: ({maxLength}) => `Слишком длинное значение, максимум символов - ${maxLength}` || "Слишком длинное значение",
    tooShort: ({minLength}) => `Слишком короткое значение, минимум символов - ${minLength}` || "Слишком короткое значение",
    customError: (input) => input.validationMessage,
  }

  static STATE_CLASSES = {
    errorInput: "form__input--error",
}

  constructor(form) {
    this.form = form
    this.bindEvents()
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email)
  }

  manageErrors(formInput, errorMessages) {
    const inputErrorElement = formInput.parentElement.querySelector(Validate.SELECTORS.errors)
    console.log(inputErrorElement)
    if (!inputErrorElement) return

    inputErrorElement.innerHTML = errorMessages
      .map((message) => `<span class="form__block-error">${message}</span>`)
      .join('')
  }


  validateField(formInput) {
    formInput.setCustomValidity("")

    // --- Кастомная проверка email ---
    if (formInput.type === "email") {
      const value = formInput.value.trim()
      const isCustomInvalid = !Validate.isValidEmail(value)

      if (isCustomInvalid) {
        formInput.setCustomValidity("Введите корректный email") // Устанавливаем кастомную ошибку
      }
    }

    // Проверяем валидность с учетом кастомной ошибки
    const isValid = formInput.checkValidity()
    const errorMessages = []

    // Считываем сообщения по типам ошибок
    Object.entries(Validate.ERROR_MESSAGES).forEach(([errorType, getErrorMessage]) => {
      if (formInput.validity[errorType]) {
        errorMessages.push(getErrorMessage(formInput))
      }
    })

    this.manageErrors(formInput, errorMessages)

    formInput.ariaInvalid = !isValid
    formInput.classList.toggle(Validate.STATE_CLASSES.errorInput, !isValid)

    return isValid
  }

  checkFormValidity() {
    const requiredFormElements = [...this.form.elements].filter(({ required }) => required)

    let isFormValid = true
    let firstInvalidFieldControl = null

    requiredFormElements.forEach((element) => {
      const isFieldValid = this.validateField(element)

      if (!isFieldValid) {
        isFormValid = false

        if (!firstInvalidFieldControl) {
          firstInvalidFieldControl = element
        }
      }
    })

    if (!isFormValid && firstInvalidFieldControl) {
      firstInvalidFieldControl.focus()
    }

    return isFormValid
  }



  onBlur(event) {
    const { target } = event
    const isRequired = target.required

    if (isRequired) {
      this.validateField(target)
    }
  }

  onChange(event) {
    const { target } = event
    const isRequired = target.required
    const isToggleType = ["checkbox", "radio"].includes(target.type)

    if (isRequired && isToggleType) {
      this.validateField(target)
    }
  }


  bindEvents() {
    this.form.addEventListener('blur', event => {
      this.onBlur(event)
    }, {capture: true})

    this.form.addEventListener('change', event => {
      this.onChange(event)
    })

  }

  clearErrors() {
    const errorSpans = this.form.querySelectorAll(Validate.SELECTORS.errors)
    errorSpans.forEach(span => {
      span.innerHTML = ''
    })
  }
}

export default Validate