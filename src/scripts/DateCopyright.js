class DateCopyright {
  static SELECTORS = {
    yearNow: "[data-js-date]",
  }

  constructor() {
    const yearNowElement = document.querySelector(DateCopyright.SELECTORS.yearNow)

    this.dateNow(yearNowElement)
  }

  dateNow (yearNowElement) {
    const nowYear = new Date().getFullYear();
    yearNowElement.textContent = nowYear
  }
}

export default DateCopyright