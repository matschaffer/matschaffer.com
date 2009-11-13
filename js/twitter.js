function updateTweets(json) {
  function links(text) {
    return text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, '<a href="$1">$1</a>');
  }

  function mentions(text) {
    return text.replace(/\B@([_a-z0-9]+)/ig, '<a href="http://www.twitter.com/$1">@$1</a>');
  }

  function relativeTime(timeString) {
    var parts = timeString.split(' ');
    var time = Date.parse([parts[1], parts[2], parts[5], parts[3]].join(' '));
    var now = new Date();
    var seconds = parseInt((now.getTime() - time) / 1000, 10) + now.getTimezoneOffset() * 60;
    if (seconds < 60) {
      return "less than a minute ago";
    } else if (seconds < 120) {
      return "about a minute ago";
    } else if (seconds < (60 * 60)) {
      return parseInt(seconds / 60, 10).toString() + " minutes ago";
    } else if (seconds < (120 * 60)) {
      return "about an hour ago";
    } else if (seconds < (24 * 60 * 60)) {
      return "about " + parseInt(seconds / 3600, 10).toString() + " hours ago";
    } else if (seconds < (48 * 60 * 60)) {
      return "1 day ago";
    } else {
      return parseInt(seconds / 86400, 10).toString() + " days ago";
    }
  }

  function source(tweet) {
    return ['<a class="source" href="http://twitter.com/', tweet.user.screen_name, "/statuses/", tweet.id, '">',
            relativeTime(tweet.created_at), '</a>'].join('');
  }

  function process(tweet) {
    return mentions(links(tweet.text)) + source(tweet);
  }

  var tweetCount = 0,
      tweets = [];

  $.each(json, function(i) {
    if (!this.in_reply_to_status_id) {
      tweets.push("<li>", process(this),"</li>");
      tweetCount++;
    }
    if (tweetCount == 3) { return false; }
  });
  $("#twitter_update_list").html(tweets.join(''));
}