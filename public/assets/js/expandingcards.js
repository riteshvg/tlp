const panels = document.querySelectorAll('.panel')

panels.forEach(function(panel){
    panel.addEventListener('click', function(){
        removeActiveClassList();
        panel.classList.add('active')
    })
})

function removeActiveClassList() {
    panels.forEach(function(panel){
        panel.classList.remove('active')
    })
}