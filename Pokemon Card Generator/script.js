
var f1;
const typeColor = {
  bug: "rgb(35 126 80 / 94%)",
  dragon: "rgb(212 191 124 / 85%)",
  electric: "rgb(197 170 69 / 95%)",
  fairy: "rgb(174 75 116 / 96%)",
  fighting: "#30336b",
  fire: "rgb(255 179 0 / 68%)",
  flying: "rgb(115 172 208 / 77%)",
  grass: "rgb(32 106 92 / 88%)",
  ground: "rgb(155 117 46 / 88%)",
  ghost: "rgb(75 41 108)",
  ice: "rgb(89 132 176 / 94%)",
  normal: "rgb(75 105 124 / 94%)",
  poison: "rgb(70 59 151)",
  psychic: "rgb(64 59 131)",
  rock: "#2d3436",
  water: "rgb(1 161 255 / 43%)",
  dark: "rgb(40 35 35 / 90%)",
  steel: "#808080"
};
const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const card1 = document.getElementById("card1");


let getPokeData = () => {
  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 400) + 1;
  let id1 = Math.floor(Math.random() * 400) + 1;
  // Combine the pokeapi url with pokemon id
  const finalUrl = url + id;
  const finalUrl1 = url + id1;


  // Fetch generated URL
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);

    });
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generatefs(data);

    });


  fetch(finalUrl1)
    .then((response) => response.json())
    .then((data2) => {
      generateCard2(data2);
    });
  fetch(finalUrl1)
    .then((response) => response.json())
    .then((data2) => {
     const timer =setTimeout(()=>{
      generatefs(data2);
     },10000);
     return()=> clearTimeout(timer);
    });
};
var i = 1;
var rohit;
var ananya;
let generatefs = (data) => {

  console.log(data);
  const hp = data.stats[0].base_stat;
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  var fs = hp / 8 + statAttack / 8 + statDefense / 8 + statSpeed / 8;
  if (i == 1) {
    rohit = fs;
  }
  if (i == 2) {
    ananya = fs;
    let userInput = document.querySelector("#userInput");
    let userInput1 = document.querySelector("#userInput1");
    console.log(rohit > ananya);
    console.log(rohit);
    console.log(ananya);
    if (userInput1.value == "") {
      if (Math.ceil(rohit) > Math.ceil(ananya)) {
        document.getElementById("69").innerHTML = userInput.value + " Wins" + `<br><img src="pokémon-happy.gif" class="squi">`;
      }
      else if(Math.ceil(rohit) == Math.ceil(ananya))
      {
        document.getElementById("69").innerHTML = "Draw.. Play Again !!" ;
      }
      else {
        document.getElementById("69").innerHTML = "Computer Wins" + `<br><img src="pokémon-happy.gif" class="squi">`;
      }
    }
    else {
      if (Math.ceil(rohit) > Math.ceil(ananya)) {
        document.getElementById("69").innerHTML = userInput.value + " Wins" + `<br><img src="pokémon-happy.gif" class="squi">`;
      }
      else if(Math.ceil(rohit) == Math.ceil(ananya))
      {
        document.getElementById("69").innerHTML = "Draw Play Again !!" ;
      }
      else {
        document.getElementById("69").innerHTML = userInput1.value + " Wins" + `<br><img src="pokémon-happy.gif" class="squi">`;
      }

    }
  }
  i = i + 1;
}

//Generate Card

let generateCard = (data) => {
  // Get necessary data and assign it to variables
  console.log(data);
  const hp = data.stats[0].base_stat;
  const imgSrc = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+data['id'].toString().padStart(3, '0')+".png"
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  // Set themeColor based on pokemon type
  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);
  card.innerHTML = `
        <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
         
        </div>
        <div class="stats">
          <div>
            <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${statAttack}"><h3>${statAttack}</h3>
            <p>Attack</p></div>
          </div>
          <div>
          <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${statDefense}"><h3>${statDefense}</h3>
          <p>Defense</p></div>
            
          </div>
          <div>
          <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${statSpeed}"><h3>${statSpeed}</h3>
          <p>Speed</p></div>
            
          </div>
        </div>

  `;
  $(document).ready(function () {
    setTimeout(function () {
      fs = hp / 8 + statAttack / 8 + statDefense / 8 + statSpeed / 8;
      $(".my-progress-bar").circularProgress({
        line_width: 6,
        color: "#ccc",
        starting_position: 0, // 12.00 o' clock position, 25 stands for 3.00 o'clock (clock-wise)
        percent: 0, // percent starts from
        percentage: true,
        text: "Final Score"
      }).circularProgress('animate', Math.ceil(fs), 1000);
    }, 8100);
  });
  appendTypes(data.types);
  styleCard(themeColor);
};


let generateCard2 = (data2) => {

  // Get necessary data and assign it to variables
  console.log(data2);
  const hp = data2.stats[0].base_stat;
  const imgSrc = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+data2['id'].toString().padStart(3, '0')+".png"
  const pokeName = data2.name[0].toUpperCase() + data2.name.slice(1);
  const statAttack = data2.stats[1].base_stat;
  const statDefense = data2.stats[2].base_stat;
  const statSpeed = data2.stats[5].base_stat;

  // Set themeColor based on pokemon type
  const themeColor = typeColor[data2.types[0].type.name];
  console.log(themeColor);
  card1.innerHTML = `
        <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types2"></div>
        <div class="stats">
          <div>
            <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${statAttack}"><h3>${statAttack}</h3>
            <p>Attack</p></div>
          </div>
          <div>
          <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${statDefense}"><h3>${statDefense}</h3>
          <p>Defense</p></div>
          </div>
          <div>
          <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${statSpeed}"><h3>${statSpeed}</h3>
          <p>Speed</p></div>
            
          </div>
          </div>
  `;

  $(document).ready(function () {
    setTimeout(function () {
      fs1 = hp / 8 + statAttack / 8 + statDefense / 8 + statSpeed / 8;
      $(".my-progress-bar1").circularProgress1({
        line_width: 6,
        color: "#ccc",
        starting_position: 0, // 12.00 o' clock position, 25 stands for 3.00 o'clock (clock-wise)
        percent: 0, // percent starts from
        percentage1: true,
        text: "Final Score"
      }).circularProgress1('animate', Math.ceil(fs1), 1000);
    }, 8300);


  });

  // document.getElementById("86").innerHTML=`[ ${hp} + ${statAttack} + ${statDefense} + ${statSpeed} ]`;

  appendTypes2(data2.types);
  styleCard2(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name[0].toUpperCase() + item.type.name.slice(1);
    document.querySelector(".types").appendChild(span);
  });
};
let appendTypes2 = (types2) => {
  types2.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name[0].toUpperCase() + item.type.name.slice(1);
    document.querySelector(".types2").appendChild(span);
  });
};
let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ddd 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};
let styleCard2 = (color2) => {
  card1.style.background = `radial-gradient(circle at 50% 0%, ${color2} 36%, #ddd 36%)`;
  card1.querySelectorAll(".types2 span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color2;
  });
};


btn.addEventListener("click", getPokeData);
btn.addEventListener("click", generatefs);


//card2
const button = document.getElementById('rohit')
button.onclick = () => {
  window.location.reload();
}
