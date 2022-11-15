console.clear();
var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function (s) {
    return document.querySelector(s);
  },
  selectAll = function (s) {
    return document.querySelectorAll(s);
  },
  //container = select('.container'),
  dotContainer = select('.dotContainer'),
  iconContainer = select('.iconContainer'),
  bubbleContainer = select('.bubbleContainer'),
  hitArea = select('.hitArea'),
  dotGroup = select('.dotGroup'),
  spacer = 60,
  minDragX,
  numItems = 20,
  dotSize = 10,
  //step, = spacer + (dotSize / 2),
  snapArray = [],
  multiplier = 4.8,
  iconArray = ['smile', 'confused', 'sad', 'shocked', 'cool', 'neutral', 'happy', 'angry', 'baffled', 'grin', 'wondering'],
  numItems = iconArray.length,
  currentIconId,
  oldIconId = -1,
  currentSpeechBubble,
  dragger,
  uiColor = '#FF5EAE',
  textColor = '#FF5EAE',
  iconColor = '#FFF',
  bubbleFillColor = '#FFF'
TweenMax.set('svg', {
  visibility: 'visible'
})

//set colour
TweenMax.set(['line'], {
  stroke: uiColor
})

TweenMax.set(['.speechBubbleFill'], {
  fill: bubbleFillColor
})
TweenMax.set(['.speechBubbleStroke'], {
  stroke: uiColor
})

TweenMax.set(['.dot'], {
  fill: uiColor
})


TweenMax.set(['.iconLabel'], {
  fill: textColor
})

var mainTl = new TimelineMax({
  paused: true
});

function makeMenu() {
  var tl;
  for (var i = 0; i < numItems; i++) {
    var c = select('.dot').cloneNode(true);
    var ic = select('#' + iconArray[i]).cloneNode(true);
    ic.setAttribute('class', 'icon');
    dotContainer.appendChild(c);
    iconContainer.appendChild(ic);
    c.setAttributeNS(null, 'btnId', i);
    TweenMax.set(c, {
      attr: {
        cx: (i * spacer),
        r: dotSize
      }
    })
    TweenMax.set(ic, {
      x: (i * spacer) - 16,
      y: 300 - 16,
      width: 0,
      height: 0,
      transformOrigin: '50% 50%',
      scale: 0,
      alpha: 0,
      fill: iconColor
    })

    snapArray.push((-i * (spacer)));

    tl = new TimelineMax({});

    tl.to(c, 1, {
      attr: {
        r: dotSize * multiplier
      },
      ease: Linear.easeNone
    })
      .to(ic, 1, {
        alpha: 1,
        scale: 2,
        ease: Linear.easeNone

      }, '-=1')
      .to(c, 1, {
        attr: {
          r: dotSize
        },
        ease: Linear.easeNone
      })
      .to(ic, 1, {
        alpha: 0,
        scale: 0,
        ease: Linear.easeNone
      }, '-=1')

    mainTl.add(tl, (i / 2));

  }

  minDragX = (-(numItems - 1) * spacer);



  dragger = Draggable.create(dotContainer, {
    type: 'x',
    bounds: {
      minX: minDragX,
      maxX: 0
    },
    onDrag: dragSlider,
    onDragStart: dragStart,
    onThrowUpdate: dragSlider,
    throwProps: true,
    onThrowComplete: throwComplete,
    minDuration: 1,
    snap: snapArray,
    overshootTolerance: 0,
    dragClickables: true
  })

  dragger[0].disable();


  TweenMax.set(dotGroup, {
    x: 400
  })

  TweenMax.set(hitArea, {
    width: dotContainer.getBBox().width,
    height: dotSize * multiplier * 2,
    x: dotContainer._gsTransform.x,
    y: select('.dot').getAttribute('cy') - ((dotSize * multiplier)),
    fill: 'transparent'
  })

  TweenMax.to([dotContainer, iconContainer], 2, {
    x: (snapArray[Math.floor(numItems / 2)]),
    onUpdate: dragSlider,
    onComplete: function () {
      throwComplete();
      dragger[0].enable();

    },
    ease: Elastic.easeOut.config(1, 0.85)
  })

  createSpeechBubble();
} //end function


function dragSlider() {
  var posX = dotContainer._gsTransform.x;
  //console.log(posX)
  TweenMax.to(mainTl, 0.5, {
    //time:((posX/minDragX) * (mainTl.duration()-2))+1,
    time: ((posX / minDragX) * (mainTl.duration() - 2)) + 1,
    ease: Elastic.easeOut.config(2, 0.75)
  })
  TweenMax.set(iconContainer, {
    x: posX
  })
  TweenMax.to(bubbleContainer, 1, {
    x: posX,
    ease: Elastic.easeOut.config(1, 0.5)
  })
}

function throwComplete() {


  var landed = Math.ceil(dotContainer._gsTransform.x / spacer);
  currentIconId = Math.abs(landed);

  showSpeechBubble();


}

function createSpeechBubble() {
  currentSpeechBubble = select('.speechBubbleGroup').cloneNode(true);
  bubbleContainer.appendChild(currentSpeechBubble);
  TweenMax.set(currentSpeechBubble, {
    y: 80,
    scale: 0,
    transformOrigin: '50% 100%'
  })
}
function showSpeechBubble() {

  currentSpeechBubble.querySelector('text').textContent = iconArray[currentIconId].toUpperCase();
  var tl = new TimelineMax();
  tl.set(currentSpeechBubble, {
    x: currentIconId * spacer - (currentSpeechBubble.getBBox().width / 2) - 5,
    rotation: (oldIconId < currentIconId) ? 45 : -45
  })
    .to(currentSpeechBubble, 1, {
      rotation: 0,
      ease: Elastic.easeOut.config(1, 0.6),
      scaleX: 1
    })
    .to(currentSpeechBubble, 0.6, {
      ease: Elastic.easeOut.config(1, 0.6),
      //alpha:1,
      scaleY: 1
    }, '-=1')

}

function clearSpeechBubble() {

  var pl = select('.popLines').cloneNode(true);

  bubbleContainer.appendChild(pl);
  var tl = new TimelineMax({
    onComplete: function () {
      if (this.data.lines) {
        bubbleContainer.removeChild(this.data.lines);
      }
    }
  });
  tl.data = { lines: pl };
  tl.set(pl, {
    x: currentSpeechBubble._gsTransform.x,
    y: currentSpeechBubble._gsTransform.y,
    transformOrigin: '50% 50%',
    scale: 0.8
  })
    .to(pl.querySelectorAll('line'), 0.3, {
      drawSVG: '100% 100%',
      ease: Linear.easeNone
    })
    .to(pl, 0.3, {
      scale: 1.4,
      ease: Expo.easeOut

    }, '-=0.3')

  TweenMax.set(currentSpeechBubble, {
    scale: 0
  })



}

function dragStart() {

  clearSpeechBubble()
}

document.body.onclick = function (e) {
  if (e.target.className.baseVal !== 'dot') {
    return;
  }

  //console.log(e.target.getAttribute('btnId'));
  oldIconId = currentIconId;
  currentIconId = parseInt(e.target.getAttribute('btnId'));

  if (oldIconId == currentIconId) {

    return
  }
  clearSpeechBubble();
  TweenMax.to([dotContainer, iconContainer], 0.8, {
    x: (snapArray[currentIconId]),
    onUpdate: dragSlider,
    onComplete: throwComplete,
    ease: Power1.easeOut
  })


}

makeMenu();



function empty() {
  var x;
  var y;
  x = document.getElementById("email").value;
  y = document.getElementById("msg").value;
if (x == "") {
  alert("Please enter the E-mail");
  return false;
};
if (y == "") {
  alert("Please write us something");
  return false;
};


  if(x != "" && y!= ""){
    $(document).ready(function () {
        $('.plane').addClass('fly'); $('.hidden').addClass('visible');
        $('.replace').removeClass('fa-paper-plane').addClass('fa-check');
        $('.rohit').text('SENT').addClass('fade');
        $('.data').text('Thanks for your Feedback 😉').addClass('fade');
        $(this).addClass('done');
    });
  };
}


// firebase

const firebaseConfig = {
  apiKey: "AIzaSyDwpTqbT6DLIbSS4Py7RMsJjVEWU4UoLSw",
  authDomain: "pokemon-c9891.firebaseapp.com",
  projectId: "pokemon-c9891",
  storageBucket: "pokemon-c9891.appspot.com",
  messagingSenderId: "267476571343",
  appId: "1:267476571343:web:e89f7560281741407213ba",
  measurementId: "G-1M2L3D6E9P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore()

// variable
const db = firestore.collection("userData");

let submitButton = document.getElementById('submit')

// create event listeners to allow submissions
submitButton.addEventListener("click", (e) => {
  e.preventDefault()

  // get form values
  let email = document.getElementById('email').value
  let msg = document.getElementById('msg').value

  // save data
  db.doc().set({
    email: email,
    msg: msg
  }).then(() => {
    console.log("Data saved")
  }).catch((error) => {
    console.log(error)
  })
})