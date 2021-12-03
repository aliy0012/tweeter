/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadtweets = () => {
    $.ajax('/tweets/', { method: 'GET'})
      .then(function(response) {
        renderTweets(response);
      });
  };

  

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    const sortTweets = tweets.sort((a,b) => a.created_at - b.created_at);
    for (const tweet of sortTweets) {
      renderTweet(tweet);
    } 
  };

  const renderTweet = function(tweet) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
    
  };
  
 
  const createTweetElement = function(tweet) {
    let $tweet = (`
      <article class = "tweets">
        <header>
          <a><i class="fa-brands fa-canadian-maple-leaf"></i>${escape(tweet.user.name)}</a>
          <span class = "username">${escape(tweet.user.handle)}</span>
        </header>
        <br>
        <div class="tweet-text-container">${escape(tweet.content.text)}</div>
        <footer>
          <span class = "time-left">${moment(tweet.created_at).fromNow()}</span>
            <div class = "tweet-icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
        </footer>
      </article>`);

    return $tweet;
  };


  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetText = $("#tweet-text").val();
    
    if (tweetText.length > 140) {
      $('#tweet-err').html('Your tweet is long!');
      $('#tweet-err').slideDown(300);
    } else if (tweetText.length === 0) {
      $('#tweet-err').html('Please enter your tweet!');
      $('#tweet-err').slideDown(300);
    } else {
      $('#tweet-err').slideUp(300);
      $('#tweet-text').val("");
      $('.counter').val(140);
      $.ajax('/tweets/', { method : 'POST', data : formData})
        .then(function(response) {
          loadtweets();
        });
    }
  });

  loadtweets();
  
});