$(function() {
  // --- modal setting
  // login modal
  $("#login").click(function() {
    $("#loginModal").modal("show");
  });

  // reserve modal
  $("#reserve").click(function() {
    $("#reserveModal").modal("show");
  });

  // close modal
  $(".closeModal").click(function() {
    var isLoginModal = $("#loginModal").hasClass("show");
    var isReserveModal = $("#reserveModal").hasClass("show");
    if (isLoginModal) {
      $("#loginModal").modal("hide");
    } else if (isReserveModal) {
      $("#reserveModal").modal("hide");
    }
  });

  // --- carousel setting
  $("#myCarousel").carousel({
    interval: 2000,
  });

  // carousel pause and play
  $("#carouselButton").click(function() {
    var targetIcon = $("#carouselButton").children("i");
    var isPause = targetIcon.hasClass("fa-pause");

    if (isPause) {
      $("#myCarousel").carousel("pause");
      targetIcon.removeClass("fa-pause");
      targetIcon.addClass("fa-play");
    } else {
      $("#myCarousel").carousel("cycle");
      targetIcon.removeClass("fa-play");
      targetIcon.addClass("fa-pause");
    }
  });
});


