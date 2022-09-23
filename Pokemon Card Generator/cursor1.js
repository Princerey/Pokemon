var $circle9 = $('.circle');

function moveCircle29(m) {
  TweenLite.to($circle9, 1.5, {
    css: {
      left: m.pageX,
      top: m.pageY
    }
  });
}
var	wrapper = $( "#button-wrapper" );

$( ".submit" ).click(function() {
      if(wrapper.not( ".checked" )) {
            wrapper.addClass( "checked" );
            setTimeout(function(){
                wrapper.removeClass( "checked" );
            }, 8000);
       }
});