$(document).ready(function() {


  //Mobil menü btn
  $("#btnMobil").click(function() {
    $("#btnMobil").toggleClass("is-active");
    $(".mobile-nav").toggleClass("mobile-nav--active");
    $("body").toggleClass("noscroll");
    $(".mobile-bg").fadeToggle(400);
  });

  // $(".mobil-bg").click(function() {
  //   $("#btnMobil").toggleClass("is-active");
  //   $(".mobile-nav").fadeToggle("mobile-nav--active");
  //   $("body").toggleClass("noscroll");
  //   $(".mobile-bg").fadeToggle();
  // });

  $(".mobil-alt-menu-var").click(function() {
    $(this).next().slideToggle();
  })

  $(".mobil-menu-link").click(function() {
    $(".mobil-menu-link").removeClass("active");
    $(this).addClass("active");
  });

  //tabs
  $(".tab-link").click(function(e) {
    e.preventDefault();
    var currentTab = $(this).attr("opentab");
    $(this).parent(".tab-nav").find(".tab-link").removeClass("active");
    $(this).addClass("active");

    $(".tab-panel[tabname=" + currentTab + "]").parent(".tabs").find(".tab-panel").removeClass("tab-active");
    $(".tab-panel[tabname=" + currentTab + "]").addClass("tab-active");
  });

  //form input
  $(".form-input .form-control").click(function() {
    $(this).parent().find("label").addClass("label--smaller");
  });

  //container spacing
  var wW = $(window).width();
  var cW = $(".container").width();
  var calculateSpace = (wW - cW) / 2;

  $(".about__left").css("padding-left", +calculateSpace + "px");

  //custom select

  $(".custom-select").each(function() {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template +=
      '<span class="custom-select-trigger">' +
      $(this).attr("placeholder") +
      "</span>";
    template += '<div class="custom-options">';
    $(this)
      .find("option")
      .each(function() {
        template +=
          '<span class="custom-option ' +
          $(this).attr("class") +
          '" data-value="' +
          $(this).attr("value") +
          '">' +
          $(this).html() +
          "</span>";
      });
    template += "</div></div>";

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(
    function() {
      $(this)
        .parents(".custom-options")
        .addClass("option-hover");
    },
    function() {
      $(this)
        .parents(".custom-options")
        .removeClass("option-hover");
    }
  );
  $(".custom-select-trigger").on("click", function() {
    $("html").one("click", function() {
      $(".custom-select").removeClass("opened");
    });
    $(this)
      .parents(".custom-select")
      .toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    $(this)
      .parents(".custom-select-wrapper")
      .find("select")
      .val($(this).data("value"));
    $(this)
      .parents(".custom-options")
      .find(".custom-option")
      .removeClass("selection");
    $(this).addClass("selection");
    $(this)
      .parents(".custom-select")
      .removeClass("opened");
    $(this)
      .parents(".custom-select")
      .find(".custom-select-trigger")
      .text($(this).text());
  });

});

$(window).scroll(function() {
  var sticky = $('.header'),
    scroll = $(window).scrollTop();

  if (scroll >= 700) sticky.addClass('header--fixed');
  else sticky.removeClass('header--fixed');
});

$(window).resize(function() {
  //container spacing
  var wW = $(window).width();
  var cW = $(".container").width();
  var calculateSpace = (wW - cW) / 2;

  $(".about__left").css("padding-left", +calculateSpace + "px");
})
