

$(document).ready(function() {
  // --- our code goes here ---
  console.log(`here I am`)

  $(`#tweetText`).on('keyup', function() {
    // alert(`Text box clicked ✅`)
    let tweetLength = $(this).val().length;
    // let counter = $(`#counter`).val()

    if (tweetLength <= 140) {
      // console.log(`Tweet length: ${tweetLength}`);
      // console.log($(`#counter`).val()-tweetLength);
      $(`#counter`).text(140-tweetLength)
    } else {
      console.log(`TOO LONG`);
      $(`#counter`).text(0+(tweetLength-140))
    }
  })
});


// document.addEventListener("click", () => {
//   console.log("You just clicked somewhere on this page.");
//   alert(`hi!👋🏽`)
// });