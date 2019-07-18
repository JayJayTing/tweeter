$(document).ready(function() {
    // --- our code goes here ---

console.log("document ready test");

// $("#textarea1").on('keypress', function(event){
//     //console.log(event);
//     console.log('clicked');
// })

// var textArea = document.getElementById("textarea1");
// textArea.addEventListener('keypress', function(event){
//     console.log("hello");
// })



$("#textarea1").on("input", function(event){
 //console.log('this is clicked: ', $(this).val())
 

 let counter = 140 - $(this).val().length;
 
 $("#counter").text(counter);
    
    if(counter < 0){
        $("#counter").css('color', 'red');
    }else{
        $("#counter").css('color', 'green');
    }



 
 //$("#counter").val(counter --);

})



  });