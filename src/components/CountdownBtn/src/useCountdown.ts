const second = ref(59)
const status = ref(false)
const timer = ref()

export const useCountdown = () => {
  function getCode() {
    status.value = true

    timer.value = setInterval(() => {
      if (second.value > 0) {
        second.value--
      } else {
        status.value = false
        clearInterval(timer.value)
      }
    }, 1000)
  }

  function resetCode() {
    second.value = 59
    getCode()
  }

  function clearCode() {
    second.value = 59
    status.value = false
    clearInterval(timer.value)
  }

  return {
    getCode,
    resetCode,
    clearCode,
    second,
    status,
    timer
  }
}
