    //Get the elements
        let text = document.getElementById('text');
        let charCount = document.getElementById('character-count');

        //Use the input method to listen for changes in the text variable
        text.addEventListener('input', function(){
            console.log(text);
            console.log(charCount);
            //Display the characters count
            charCount.textContent=text.value.length;
        })
    
      
