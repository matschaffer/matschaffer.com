google.load("jquery", "1.3.1");
google.setOnLoadCallback(function() {
  var phone = $("#phone");
  phone.html($('<a href="#">' + phone.text() + '</a>').click(function() {
    $("#clicktocall").toggle();
    return false;
  }));
});