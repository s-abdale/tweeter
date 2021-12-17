/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
**/


$(document).ready(function () {
  const createTweetElement = function (tweetObject) {
    const timePosted = timeago.format(tweetObject.created_at);
    const markup = `
      <article>
        <section class="tweet-header">
          <div class="tweet-avatar">
            <img src="${tweetObject.user.avatars}">
            <span>&nbsp&nbsp${tweetObject.user.name}</span>
          </div>
          <span class="tweet-handle">${tweetObject.user.handle}</span>
        </section>
        <br>
        <div class="posted-tweet">
          <p class="tweeted-text">${tweetObject.content.text}</p>
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
  const renderMarkup = function (tweetArr) {
    for (let tweetObject of tweetArr) {
      // create and attach HTML element to the dom
      const markup = createTweetElement(tweetObject);
      // Targetting the container and appending the item to it
      $('#tweets-container').prepend(markup); //try PREPEND 🚨
      // return $('#tweets-container')
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
    .done(tweetArr => {
      renderMarkup(tweetArr)
    })
    .fail(err => {console.log(`ERROR: ${err.message}`)})
    .always(()=> {console.log('Request to tweet object has been executed')})
  }

  // catch the form submit
  $('.new-tweet-form').on('submit', function(event){
    event.preventDefault();
    // const inputBox = $(this).children('#tweetText'); // use later w/tweetText
    console.log('Submit is being triggered');


    // set up POST req here
    const inputBox = $(this).children('#tweetText');
    const tweetText = inputBox.val();
    console.log(tweetText)

    if (tweetText.length > 140) {
      console.log('REDUCE LENGTH OF TWEET');
    } else {
      
      // post to /tweets
      $.ajax({
        // url: `/tweets/${tweetText}`,
        url: `/tweets/`,
        method: 'POST',
        data: $(this).serialize()
      }).then(function() {
        $('#tweetText').val("");
        $.get('/tweets/', (data) => {
          const latestTweet = data.slice(-1).pop();
          const latestTweetObj = createTweetElement(latestTweet);
          $('#tweets-container').prepend(latestTweetObj);
        })
      })
      .fail(err => {console.log(`ERROR: ${err.message}`)})
      .always(()=> {
        $('#counter').text(140);
        console.log('Posting tweet object has been executed, and counter reset');
      })
    }
  })
  getTweets();
})