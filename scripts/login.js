let loginButtons = document.querySelector('.login-buttons')
let regButton = document.querySelector('.reg-button')
let loginButton = document.querySelector('.login-button')
let exitButton = document.querySelector('.exit-button')
let userLabel = document.querySelector('.username')
let addNewButton = document.querySelector('.add-button')
let modal = createModal()

regButton.addEventListener('click', showModal)
loginButton.addEventListener('click', showModal)
exitButton.addEventListener('click', signOut)

if (!(localStorage.getItem('user') === 'null')){
  setUser(localStorage.getItem('user'))
  show(exitButton)
  show(addNewButton)
} else {
  show(loginButton, regButton)
}


function showModal(){
  modal.show()
}



function createModal(){
  let $popup = document.createElement('div')
  $popup.classList.add('modal')
  $popup.innerHTML = `
  <div class="overlay"></div>
  <form action="#" class="form">
    <div class="inputs">
      <label class="label" for="log-input-1">Логин</label>
      <input type="text" class="input" id="log-input-1" maxlength="15">
      <label class="label" for="log-input-2">Пароль</label>
      <input type="password" class="input" id="log-input-2" maxlength="15">
    </div>
    <div class="buttons">
      <button class="button cancel-button" >cancel</button>
      <button class="button submit-button" type="submit">submit</button>
    </div>
  </form>
  `
  hide()
  document.body.insertAdjacentElement('afterbegin', $popup)
  
  // elements of the form
  let $cancelButton = $popup.querySelector('.cancel-button')
  let $submitButton = $popup.querySelector('.submit-button')
  let $input1 = $popup.querySelector('#log-input-1')
  let $input2 = $popup.querySelector('#log-input-2')
  
  //adding listeners
  $cancelButton.addEventListener('click', () => {
    hide()
  })
  
  $popup.addEventListener('click', ev => {
    if (ev.target.classList.value === 'overlay') {
      hide()
    }
  })
  
  $submitButton.addEventListener('click', ev => {
    ev.preventDefault()
    setUser($input1.value)
    $popup.querySelector('form').reset()
  
    hide()
  })
  
  function hide(){
    $popup.classList.toggle('hide')
  }
  
  return {
    hide,
    show: hide
  }
}

function signOut(){
  userLabel.innerHTML = ''
  show(loginButton, regButton)
  hide(exitButton, addNewButton)
  localStorage.setItem('user', null)
  
}

function setUser(username){
  userLabel.innerHTML = username
  show(exitButton, addNewButton)
  hide(loginButton, regButton)
  localStorage.setItem('user', username)
}

function hide(...elements){
  elements.forEach(el => el.style.display = 'none')
}

function show(...elements){
  elements.forEach(el => el.style.display = 'initial')
}
