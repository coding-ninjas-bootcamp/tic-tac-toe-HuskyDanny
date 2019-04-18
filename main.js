// alternatives for var?
var grid, playerActive, gameGoing, counts;

function makeArray(w, h, val) {
  result = [];
  for (let i = 0; i <= h; i++) {
    let temp = [];
    result.push(temp);
    for (let j = 0; j <= w; j++) {
      temp.push(val);
    }
  }
  return result;
}

//Restart everything
const init = function() {
  counts = 0;
  grid = makeArray(2, 2, -1);
  playerActive = 0;
  gameGoing = true;
  document.querySelector(".p" + 0 + "bar").style.display = "block";
  document.querySelector(".p" + 1 + "bar").style.display = "none";
  document.querySelector(".w" + 1).style.display = "none";
  document.querySelector(".w" + 0).style.display = "none";

  let imgs = document.querySelector(".images");
  while (imgs) {
    imgs.parentNode.removeChild(imgs);
    imgs = document.querySelector(".images");
  }
  let draw = document.querySelector(".draw");
  if (draw) {
    draw.parentNode.removeChild(draw);
  }
};

//Updating game score and check for winning condition
const algorithm = function(j, i) {
  grid[j][i] = playerActive;
  //column-wise
  if (
    grid.slice(j - 1)[0].slice(i)[0] === playerActive &&
    grid.slice((j + 1) % grid.length)[0].slice(i)[0] === playerActive
  ) {
    return true;
  }  
  //row-wise
  if (
    grid.slice(j)[0].slice(i - 1)[0] === playerActive &&
    grid.slice(j)[0].slice((i + 1) % grid.length)[0] === playerActive
  ) {
    return true;
  }
  //diagnal wise top-down
  if (grid[0][0] == playerActive && grid[1][1] == playerActive && grid[2][2] == playerActive) {
    return true;
  }
  //diagnal wise bottom-up
  if (grid[0][2] == playerActive && grid[1][1] == playerActive && grid[2][0] == playerActive) {
    return true;
  }
  return false;
  
};

// Listen and animate the playing process
const animate = function(index) {
  document.querySelector("#" + index).addEventListener("click", function() {
    if (gameGoing) {
      counts += 1;
      const i = index.slice(-1)[0];
      const j = index.slice(-2)[0];
      const oImg = document.createElement("img");
      oImg.setAttribute("src", "./imgs/piece-" + playerActive + ".png");
      oImg.setAttribute("height", "100%");
      oImg.setAttribute("class", "images");
      oImg.setAttribute("width", "100%");
      document.querySelector("#" + index).appendChild(oImg);
      if (algorithm(parseInt(j), parseInt(i))) {
        document.querySelector(".w" + playerActive).style.display = "block";
        gameGoing = false;
      } else {
        document.querySelector(".p" + playerActive + "bar").style.display =
          "none";
        playerActive = playerActive ? 0 : 1;
        document.querySelector(".p" + playerActive + "bar").style.display =
          "block";
      }
      if (counts > 8 && gameGoing) {
        const draw = document.createElement("span");
        draw.innerHTML = "<strong> DRAW </strong>";
        draw.setAttribute("class", "draw");
        draw.style.marginLeft = "auto";
        draw.style.marginRight = "auto";
        draw.style.fontSize = "50px";
        document.querySelector(".board").appendChild(draw);
        gameGoing = false;
      }
    }
  });
};

init();
// Listeners
animate("grid-00");
animate("grid-01");
animate("grid-02");
animate("grid-10");
animate("grid-11");
animate("grid-12");
animate("grid-20");
animate("grid-21");
animate("grid-22");
document.querySelector(".btn-restart").addEventListener("click", init);
