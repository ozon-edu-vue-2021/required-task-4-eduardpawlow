export function debounce(func, wait) {
  let timeout

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(func.bind(context, ...args), wait)

  }
}