const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    dark:"#000000",
    steel:"#808080"
  };
const testimonials = Array(8)
  .fill(null)


loadContent(testimonials);
function loadContent(testimonials) {
  const buildTemplate = (template, data1) => {
    for (const key in data1) {
      const reg = new RegExp(`{${key}}`, "ig");
      template = template.replace(reg, data1[key]);
    }
    return template;
  };
  const ChatBubble = function (data1) {
    const elem = document.createElement("div");
    let id1 = Math.floor(Math.random() * 600) + 1;
    if (id1< 100&&id1>=10)
    {
      id="0"+id1;
    }
    else if (id1 < 10)
    {
      id="0"+"0"+id1;
    }
  
    else
    {
      id=id1;
  
    }
    const url = " https://pokeapi.co/api/v2/pokemon/";
    const finalUrl = url + id1;
    fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
         generateCard(data);
    })
    let generateCard = (data) => {
        
        // Get necessary data and assign it to variables
        const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
        const id1 =data.id;
        let id = id1;
        let type=data.types[0].type.name[0].toUpperCase() +data.types[0].type.name.slice(1);
        // let type1=data.types[1].type.name[0].toUpperCase() +data.types[1].type.name.slice(1);
    if (id1< 100&&id1>=10)
    {
      id="0"+id1;
    }
    else if (id1 < 10)
    {
      id="0"+"0"+id1;
    }
  
    else
    {
      id=id1;
  
    }
   
    elem.classList.add("chat-bubble");
    elem.style.setProperty("--rotation", data1.rotation + "deg");
    elem.innerHTML = buildTemplate(
      `
	  <div class='container'>
      <div class='card'>
      <div class='image'>
        <img class='img' src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png'/>
      </div>
      <div class='content'
        <div><span class="id">#${id1}</span><span class="pknm"> ${pokeName}</span><br><span class="type"><span class="id1">Type -</span> ${type}</span></div>
      </div>
      </div>
      </div>
    `,
    );
    }
    setTimeout(() => {
      if (elem.children[2].scrollHeight > elem.children[2].clientHeight) {
        elem.classList.add("truncated");
      }
    }, 100);
    return elem;
  };

  const rotationAmt = 360 / testimonials.length;
  let focused = 0;
  const tElem = document.querySelector(".testimonial");
  const testimonialsElem = document.querySelector(".testimonials");
  const navElem = document.querySelector(".navigation");

  let paused = false;
  tElem.onmouseover = () => {
    paused = true;
  };
  tElem.onmouseleave = () => {
    paused = false;
  };

  window.onblur = () => {
    paused = true;
  };
  window.onfocus = () => {
    paused = false;
  };

  function getFocusedIndex() {
    let n = focused;
    while (n < 0) n += testimonials.length;
    return n % testimonials.length;
  }

  const radius = 400 / (2 * Math.sin(Math.PI / testimonials.length));
  const distToEdge = Math.round(Math.sqrt(radius ** 2 - 200 ** 2) + 30);
  testimonialsElem.style.setProperty("--distance", distToEdge + "px");

  testimonials.forEach((testimonial, i) => {
    testimonialsElem.appendChild(
      ChatBubble({
        ...testimonial,
        rotation: i * rotationAmt
      })
    );

    const navBtn = document.createElement("div");
    navBtn.classList.add("nav-dot");
    navBtn.addEventListener("click", () => {
      select(i);
    });
    navElem.appendChild(navBtn);
  });

  let timeout;
  function update() {
    testimonialsElem.style.setProperty(
      "--rotation",
      -(focused * rotationAmt) + "deg"
    );
    const { children } = testimonialsElem;
    for (var i = 0; i < children.length; i++) {
      if (getFocusedIndex() === i) {
        // children[i].style.setProperty("filter", "blur(0)");
        children[i].classList.add("focused");
        navElem.children[i].classList.add("focused");
      } else {
        // children[i].style.setProperty("filter", "blur(2px)");
        children[i].classList.remove("focused");
        navElem.children[i].classList.remove("focused");
      }
    }
    if (timeout) clearTimeout(timeout);
    const nextTimeout = (cb) => {
      timeout = setTimeout(() => {
        cb();
      }, 5000);
    };
    nextTimeout(() => {
      if (paused) {
        update();
      } else {
        focused++;
        update();
      }
    });
  }
  function select(index) {
    const closest = index - getFocusedIndex();
    focused += closest;
    update();
  }
  update();

  document.querySelector(".arrow-right").addEventListener("click", () => {
    focused++;
    update();
  });

  document.querySelector(".arrow-left").addEventListener("click", () => {
    focused--;
    update();
  });
}
const button = document.getElementById('roh')
button.onclick = () => {
  window.location.reload();
}