/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  const createShowElement = function (showObject) {
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
    return markup
  }

  // loop through the results
  const renderMarkup = function (showArr) {
    for (let showObject of showArr) {
      // create and attach HTML element to the dom
      const markup = createShowElement(showObject);
      // Targetting the container and appending the item to it
      $('#tweets-container').append(markup);
    }
  }

  // perform request and deal with result
  const getTweets = function (/*woudl otherwise be URL value frm inputbox - i.e. tweetText*/) {
    // extract text input
    // const tweetText = inputBox.val(); // NOT IN USE YET - use this to retrieve specific data from /tweets/, probably newest object in array


    // send the request to /tweets
    $.ajax({
      // url: `/tweets/${tweetText}`,
      url: `/tweets/`,
      method: 'GET'
    })
    .done(results => {
      // console.log(results); // object of objects
      renderMarkup(results)
    })
    .fail(err => {console.log(`ERROR: ${err.message}`)})
    .always(()=> {console.log('Request to tweet object has been executed')})
  }

  // catch the form submit
  $('.new-tweet-form').on('submit', function(event){
    event.preventDefault();
    const inputBox = $(this).children('#tweetText');
    console.log('Submit is being triggered')

    getTweets();
  })



  // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  // const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})