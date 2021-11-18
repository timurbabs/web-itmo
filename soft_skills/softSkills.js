let table = document.querySelector('.table')
let content = document.querySelector('.content')
let warning = document.querySelector('.warning')
let loader = document.querySelector('.lds-ring')
let addButton = document.querySelector('.add-button')
let popup = createPopup()

addButton.addEventListener('click', () => {
  popup.show()
})
window.onload = async function(){
  
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(todos => {
      todos.filter(chooseFilterFunction()).forEach(todo => {
        let newRow = document.createElement('tbody')
        newRow.insertAdjacentHTML('beforeend', `
          <tr class="row">
            <td>${todo.userId}</td>
            <td>${todo.id}</td>
            <td>${todo.title}</td>
            <td>${todo.completed}</td>
            <td id="td-hide"><div class="delete-button"><img src="../images/trash-bin.png" alt=""></div></td>
          </tr>`)
        
        let delButton = newRow.querySelector('.delete-button')
        delButton.addEventListener('click', () => {
          newRow.remove()
        })
        table.insertAdjacentElement("beforeend", newRow)
      })
      
    }).then(()=> {
    hide(loader)
    show(content)
  })
    .catch(()=>{
      hide(loader, content)
      show(warning)
    })
  getLoadTime()
}
function chooseFilterFunction(){
  let num = Math.floor(Math.random() * 2)
  if (num) return (i) => i.id > 100
  else return (i)=> i.id < 200
}

function createPopup(){
  // creating and inserting a popup element
  let $popup = document.createElement('div')
  $popup.classList.add('popup')
  $popup.innerHTML = `
  <div class="overlay"></div>
  <form action="#" class="form">
    <div class="inputs">
      <label class="label" for="input-1">UserId</label>
      <input type="text" class="input" id="input-1" maxlength="15">
      <label class="label" for="input-2">Id</label>
      <input type="text" class="input" id="input-2" maxlength="15">
      <label class="label" for="input-3">Title</label>
      <input type="text" class="input" id="input-3" maxlength="15">
      <label class="label" for="input-4">Completed</label>
      <input type="text" class="input" id="input-4" maxlength="15">
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
  let $input1 = $popup.querySelector('#input-1')
  let $input2 = $popup.querySelector('#input-2')
  let $input3 = $popup.querySelector('#input-3')
  let $input4 = $popup.querySelector('#input-4')
  let $input5 = $popup.querySelector('#input-5')
  
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
    console.log('submit')
    let data = {
      input1: $input1.value,
      input2: $input2.value,
      input3: $input3.value,
      input4: $input4.value,
    }
    
    addToTable(data)
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


function addToTable(data){
  if (!(data.input1 || data.input2 || data.input3 || data.input4 || data.input5)) return
  
  let newRow = document.createElement('tbody')
  newRow.insertAdjacentHTML('beforeend', `
  <tr class="row">
    <td>${!data.input1 ? '-' : data.input1}</td>
    <td>${!data.input2 ? '-' : data.input2}</td>
    <td>${!data.input3 ? '-' : data.input3}</td>
    <td>${!data.input4 ? '-' : data.input4}</td>
    <td id="td-hide"><div class="delete-button"><img src="../images/trash-bin.png" alt=""></div></td>
</tr>

  `)
  
  let delButton = newRow.querySelector('.delete-button')
  delButton.addEventListener('click', () => {
    newRow.remove()
  })
  table.insertAdjacentElement("beforeend", newRow)
  
}

function hide(...elements){
  elements.forEach(el => el.style.display = 'none')
}

function show(...elements){
  elements.forEach(el => el.style.display = 'initial')
}
