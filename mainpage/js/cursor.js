var $circle = $('.circle');

function moveCircle(e) {
  TweenLite.to($circle, 1.5, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });
}
$(window).on('mousemove', moveCircle);