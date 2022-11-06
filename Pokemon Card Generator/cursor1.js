$(window).on('mousemove', moveCircle29);
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
            }, 9000);
       }
});  // add class on click javascript
  function addClass() {
    // Get the paragraph element
    const element = document.getElementById("id9");
    // Add a class to the paragraph
    element.className = "beautify line-1 anim-typewriter ";
    const element9 = document.getElementById("id10");
    // Add a class to the paragraph
    element9.className = "beautify1 line-2 anim-typewriter1";
    const element1 = document.getElementById("card")
    element1.classList.add("blur");
    const element2 = document.getElementById("card1")
    element2.classList.add("blur");
    
    const element3 = document.getElementById("12")
    element3.classList.add("bg");
    element3.classList.add("win1");

 
    const element4 = document.getElementById("13")
    element4.classList.add("bg");
    element4.classList.add("win1");
      
    const element5 = document.getElementById("button-wrapper")
    element5.classList.add("nonbt");
    const element6= document.getElementById("10");
    element6.className = "b";
    const element8= document.getElementById("100");
    element8.className = "b1";
    
  }

