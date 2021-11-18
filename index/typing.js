let title = document.querySelector('.main__title')
let i = 0
let text = 'Hello, fellas my name is Timurbabs'

function typing(){
  if (i < text.length){
    title.innerHTML += text[i]
    i++
    setTimeout(typing, 50)
    if (i === 13){
      title.insertAdjacentHTML('beforeend', '<br>')
    }
  }
}

typing()

console.log('aboba')
