const insert = document.getElementById('insert')

window.addEventListener('keydown', function(event){
    //if event.key equals to 'Space', then (?) pass the value 'Space' 
    // else if event.key is not equal to 'Space' then (:) pass the event key
    insert.innerHTML = `
      <div class="key">
        ${event.key === ' ' ? 'Space' : event.key}
        <small>event.key</small>
      </div>
      <div class="key">
        ${event.keyCode}
        <small>event.keyCode</small>
      </div>
      <div class="key">
        ${event.code }
        <small>event.code</small>
      </div>
    `
})
