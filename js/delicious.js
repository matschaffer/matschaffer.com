function updateBookmarks(bookmarks) {
  var bookmarkList = [];
  $.each(bookmarks, function() {
    bookmarkList.push('<li>', '<a href="', this.u, '">', this.d, '</a>', '</li>');
  });
  $("#bookmark_list").html(bookmarkList.join(''));
}