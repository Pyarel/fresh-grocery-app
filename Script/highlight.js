(function ($) {
  $.fn.highlightMenu = function () {
    return this.each(function () {
      var options = $("li a");
      options
        .css("font-family", "arial, helvetica, sans-serif")
        .css("font-weight", "bold")
        .css("text-decoration", "none")
        .css("background-color", "white")
        .css("color", "black")
        .css("width", "125px");
      options.mouseover(function () {
        $(this).css("background-color", "#d8000c").css("color", "#white");
      });
      options.mouseout(function () {
        $(this).css("background-color", "white").css("color", "black");
      });
    });
  };
})(jQuery);

//highlight menu plugin
$(document).ready(function () {
  $("#nav_menu").highlightMenu();
});
