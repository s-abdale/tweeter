/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {


  const createTweetElement = function (tweetData) {
  const timePosted = timeago.format(tweetData.created_at);
  const markup = `
    <article>
      <section class="tweet-header">
        <div>
          <i class="far fa-user">&nbsp</i>
          <span class="tweet-name">${tweetData.user.name}</span>
        </div>
        <span class="tweet-handle">${tweetData.user.handle}</span>
      </section>
      <br>
      <div class="posted-tweet">
        <p class="tweeted-text">${tweetData.content.text}</p>
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
    return markup;
    // const $tweet = $(`<article class="tweet">Hello world</article>`);
  }

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

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})




// Notes:
/*
  tweet data object:
{
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
*/