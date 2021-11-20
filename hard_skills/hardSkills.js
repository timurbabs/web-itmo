const makeButton = document.querySelector('.add-button')
const table = document.querySelector('.table')
let popup = createPopup()

makeButton.addEventListener('click', () => {
  popup.show()
})

window.onload = function (){
  
  if (localStorage.getItem('table') == null){
    
    let newRow = document.createElement('tbody')
    newRow.insertAdjacentHTML('beforeend', `
        <tr class="row">
          <td>приоритет</td>
          <td>технология</td>
          <td>язык</td>
          <td>интерес</td>
          <td>опыт</td>
</tr>`)
    table.insertAdjacentElement('afterbegin',newRow)
    localStorage.setItem('table', table.innerHTML)
    
  } else {
    
    let rows = localStorage.getItem('table').split('<tbody>')
    for (let i = 0; i < rows.length; i++){
      let row = rows[i]
      row = row.trim()
      if (row.length < 10) continue;
      row = row.replace('</tbody>', '')
      
      let rowElement = document.createElement('tbody')
      rowElement.insertAdjacentHTML('afterbegin', row)
      let delButton = rowElement.querySelector('.delete-button')
      if (!(delButton === null)) {
        delButton.addEventListener('click', () => {
          rowElement.remove()
          localStorage.setItem('table', table.innerHTML)
        })
      }
      table.insertAdjacentElement("beforeend", rowElement)
    }
  }
  getLoadTime()
}




function createPopup(){
  // creating and inserting a popup element
  let $popup = document.createElement('div')
  $popup.classList.add('popup')
  $popup.innerHTML = `
  <div class="overlay"></div>
  <form action="#" class="form">
    <div class="inputs">
      <label class="label" for="input-1">priority</label>
      <input type="text" class="input" id="input-1" maxlength="15">
      <label class="label" for="input-2">technology</label>
      <input type="text" class="input" id="input-2" maxlength="15">
      <label class="label" for="input-3">language</label>
      <input type="text" class="input" id="input-3" maxlength="15">
      <label class="label" for="input-4">interest</label>
      <input type="text" class="input" id="input-4" maxlength="15">
      <label class="label" for="input-5">experience</label>
      <input type="text" class="input" id="input-5" maxlength="15">
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
  
    let data = {
      input1: $input1.value,
      input2: $input2.value,
      input3: $input3.value,
      input4: $input4.value,
      input5: $input5.value,
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
  if (!(data.input1 || data.input2 || data.input3 || data.input4)) return
  
  let newRow = document.createElement('tbody')
  newRow.insertAdjacentHTML('beforeend', `
  <tr class="row">
    <td>${!data.input1 ? '-' : data.input1}</td>
    <td>${!data.input2 ? '-' : data.input2}</td>
    <td>${!data.input3 ? '-' : data.input3}</td>
    <td>${!data.input4 ? '-' : data.input4}</td>
    <td>${!data.input5 ? '-' : data.input5}</td>
    <td id="td-hide"><div class="delete-button"><img src="../images/trash-bin.png" alt=""></div></td>
</tr>

  `)
  
  let delButton = newRow.querySelector('.delete-button')
  delButton.addEventListener('click', () => {
    newRow.remove()
    localStorage.setItem('table', table.innerHTML)
  })
  table.insertAdjacentElement("beforeend", newRow)
  
  localStorage.setItem('table', table.innerHTML)
}
