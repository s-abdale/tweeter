/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  // // CREATE TWEET ELEMENT
  // const createTweetElement = function (tweetData) {
  //   const timePosted = timeago.format(tweetData.created_at);
    
  //   const markup = `
  //     <article>
  //       <section class="tweet-header">
  //         <div>
  //           <i class="far fa-user">&nbsp</i>
  //           <span class="tweet-name">${tweetData.user.name}</span>
  //         </div>
  //         <span class="tweet-handle">${tweetData.user.handle}</span>
  //       </section>
  //       <br>
  //       <div class="posted-tweet">
  //         <p class="tweeted-text">${tweetData.content.text}</p>
  //       </div>
  //       <footer class="tweet-footer">
  //         <div class="tweet-days-ago">
  //           <i>${timePosted}</i>
  //         </div>
  //         <div class="tweet-icons">
  //           <i class="far fa-flag">&nbsp &nbsp</i>
  //           <i class="fas fa-heart">&nbsp &nbsp</i>
  //           <i class="fas fa-retweet"></i>
  //         </div>
  //       </footer>
  //     </article>
  //     `
  //   return markup;
  // }

  // FUNCTION TO ADD TWEETS

  // SUBMIT TWEET ON CLICK
  // const $newTweet = $('.new-tweet-form');




  // catch the form submit
  $('.new-tweet-form').on('submit', function(event){


    // prevent form submission
    event.preventDefault();
    console.log('Submit is being triggered')

    // extract search keyword -> text input
    const inputBox = $(this).children('#tweetText');
    const tweetText = inputBox.val();

    // create a request to the createTweetElement converter
    // const tweetElement = createTweetElement(tweetData);

    // send the request to /tweets
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .done(results => {
      console.log(results); // object of objects
      for (let showObject of results) {
        console.log(showObject); // shows individual objects in main array

        // create and attach HTML element to the dom
        const timePosted = timeago.format(showObject.created_at);
        const markup = `
        <article>
          <section class="tweet-header">
            <div class="tweet-avatar">
              <img src="${showObject.user.avatars}">
              <span>&nbsp&nbsp${showObject.user.name}</span>
            </div>
            <span class="tweet-handle">${showObject.user.handle}</span>
          </section>
          <br>
          <div class="posted-tweet">
            <p class="tweeted-text">${showObject.content.text}</p>
          </div>
          <footer class="tweet-footer">
            <div class="tweet-days-ago">
              <i>${timePosted}</i>
            </div>
            <div class="tweet-icons">
              <i class="far fa-flag">&nbsp &nbsp</i>
              <i class="fas fa-heart">&nbsp &nbsp</i> 
              <i class="fas fa-retweet"></i>
            </div>
          </footer>
        </article>
        `
        // Targetting the container and appending the item to it
        $('#tweets-container').append(markup);
      }





    })
    .fail(err => {console.log(`ERROR: ${err.message}`)})
    .always(()=> {console.log('Request to tweet object has been executed')})
  })















  // $newTweet.on('submit', function (event) {
  //   console.log('Tweet submitted, performing ajax call ...');
  //   event.preventDefault(); // stops refreshing

  //   $.ajax({
  //     method: 'POST',
  //     url: '/tweets',
  //     data: $(this).serialize(),
  //   }).then(function() {
  //     console.log('Ajax starting addition');

  //   })
  // })

  // const createTweet = function($tweets) {
  //   const $tweet = createTweetElement(tweetData);
  //   $('#tweets-container').append($tweet)
  // }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  // const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})