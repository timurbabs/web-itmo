let loadTime
window.onload = getLoadTime

function getLoadTime() {
  loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart
  document.querySelector('.load-time_text').innerHTML = `Load time: ${loadTime/1000}s`
}
