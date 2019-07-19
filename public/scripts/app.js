/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
//these are all the tweets that will be appeneded;
const data = [
    {
      "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
// will append tweets into the data file later on
const renderTweets = function(tweets) {
  // loops through tweets
  let array = [] 
  for(let tweet of tweets){
     
     array.unshift(createTweetElement(tweet));
     
  }
  $("#tweetsContainer").append(array);
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}



// creates a tweet html structure and returns it
const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...
const markup = `
<section class="boxDesign" >

<div style="padding: 2%">
 
    <div class = "tweetIdFormat">
      <img src=${tweet.user.avatars} />
      <p>${tweet.user.name}</p>
      <span class="lg2" >
      ${tweet.user.handle}
      </span>
    </div>
    <br>
  <span>
    <p class ="paragraphFormat"> 
    ${escape(tweet.content.text)}
    </p>
  </span>
  <span class="bottomtweet">
    <div>${moment(
      new Date(tweet.created_at)
    ).fromNow()}
    <div>
      <span class="buttons">
        <button>b1</button>
        <button>b2</button>
        <button>b3</button>
      </span>

    </div>

  </span>
</div>
</section>


<br>
`

$tweet = $tweet.append(markup);

  return $tweet;
}
//checks if the text given by user is valid
function isValidText(text){
  if(text == "text=" || text.length> 145){
    return false;
  }else{
    return true;
  } 

}

//will count of user and update it live;
function textCount(){
  $("#textarea1").on("input", function(event) {
      //console.log('this is clicked: ', $(this).val())
   
  
      let counter = 140 - $(this).val().length;
   
      $("#counter").text(counter);
      
      if (counter < 0) {
        $("#counter").css('color', 'red');
      } else {
        $("#counter").css('color', 'green');
      }
  
  
  
   
      //$("#counter").val(counter --);
  
    });
  }

  //this will update the html file on the browser, updating the tweets live
function loadTweets(){
  event.preventDefault();
  $.ajax( {
    method: 'GET',
    //url gets whatever information from the site below and stores it in its 'data' parameter
    //url: "http://localhost:8080/tweets",
    url: "/tweets/",
    dataType: 'json',
}).done(function(data){ 
  $("#tweetsContainer").empty();
   renderTweets(data);
    
}).fail(function(){
    console.log(" get tweet error")
})
}
function postTweets(){
  
    $("form").on("submit", function(event){
        event.preventDefault();
        let textInput = $("#textarea1").serialize();
        
        if(!isValidText(textInput)){
          $(".error-message").slideDown("slow", function(){
            setTimeout(function(){$(".error-message").slideToggle()}, 1000);
          });
        }else{
            $.ajax('/tweets/', {
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'text',
            
        }).done(function(){
           //get latest
           $("#textarea1").val('');
           $("#counter").text("140");
            data.content = "text= "
          //renderTweets(data);
          loadTweets(data);
          //location.reload();
            
        }).error(function(){
            console.log("post tweet error")
        })
        }
    })
}
function toggleTextBox(){
$("#write").on("click", function(event){
  console.log("header clicked")

  $(".new-tweet").slideToggle();
  

})


}

$(document).ready(function() {
  $(".new-tweet").slideToggle();
  textCount();
  loadTweets();
  postTweets();
  toggleTextBox();
})

