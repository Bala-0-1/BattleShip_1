let playerArray = [[{type: "boat"}, {type: "hidden"}, {type: "hidden"}],
                [{type: "hidden"}, {type: "hit"}, {type: "hidden"}],
                [{type: "hidden"}, {type: "hidden"}, {type: "boat"}] ]; 
let opponentArray = [[{type: "hidden"}, {type: "hit"}, {type: "hidden"}],
[{type: "hidden"}, {type: "hidden"}, {type: "hidden"}],
[{type: "hit"}, {type: "hidden"}, {type: "hit"}] ]; 

function _(id) {
    return document.getElementById(id);
}
 
createOpponentGrid(); 
createPlayerGrid();

let serverURL = "http://localhost:8888/"

async function getGrid() {

    const gridResponse = await fetch(serverURL + "/getArray", {mode: 'no-cors'})
    if (!gridResponse.ok) {
        console.log("Grid not found.");
    }
    else {
        playerArray = gridResponse.player1Array;
        opponentArray = gridResponse.player2Array;
    }

}

function returnNumberArray(stringArray){

    let numbers = [];
    let numberString = "";

    for(let i = 0; i < stringArray.length; i++){
        if (stringArray[i] == parseInt(stringArray[i])) {
            numberString += stringArray[i];

            if (i == stringArray.length-1) {
                numbers.push(parseInt(numberString) );
                numberString = "";
            }
        }
        else if(numberString.length>0) {
            numbers.push(parseInt(numberString));
            numberString = "";
        }
    }
    return numbers;
}


function createPlayerGrid() {

    for (let i = 0; i < playerArray.length; i++) {
        createParent(i, "player-grid");
        for (let j = 0; j < playerArray[i].length; j++) {
            let parentId = "parent" + i;
            if (playerArray[i][j].type == "hidden") addHiddenBlock(i, j, parentId);
            else {
                if (playerArray[i][j].type == "hit") addHitBoat(i, j, parentId);
                else addColorBoat(i, j, parentId);
            }
        }
    }

}

function createParent(rowNumber, container) {

    const parent = document.createElement("div");
    parent.id = "parent" + rowNumber;
    parent.classList.add("row"); 
    _(container).appendChild(parent);

}

function addHiddenBlock(i, j, parentId) {

    const hiddenBlock = document.createElement("div");
    hiddenBlock.id = String(i) + "," + String(j);
    hiddenBlock.classList.add("hidden");
    _(parentId).appendChild(hiddenBlock);

}

function addHitBoat(i, j, parentId) {

    const hitBlock = document.createElement("div");
    hitBlock.id = String(i) + "," + String(j);
    hitBlock.classList.add("hit");
    _(parentId).appendChild(hitBlock);

}

function addColorBoat(i, j, parentId) {

    const colorBlock = document.createElement("div"); 
    colorBlock.id = String(i) + "," + String(j);
    colorBlock.classList.add("boat"); 
    _(parentId).appendChild(colorBlock);

}

function createOpponentGrid() {

    for (let i = 0; i < opponentArray.length; i++) {
        createParent(i, "opponent-grid");
        for (let j = 0; j < opponentArray[i].length; j++) {
            let parentId = "parent" + i;
            if (opponentArray[i][j].type == "hit") addOpponentHitBoat(i, j, parentId);
            else addOpponentHiddenBlock(i, j, parentId); 
        }

    }
}

function addOpponentHitBoat(i, j, parentId) {

    const hitBoat = document.createElement("div"); 
    hitBoat.id = String(i) + "," + String(j);
    hitBoat.classList.add("hit");
    _(parentId).appendChild(hitBoat);
    _(hitBoat.id).addEventListener('click', passCoordinates);

}

function addOpponentHiddenBlock(i, j, parentId) {

    const hiddenBlock = document.createElement("div");
    hiddenBlock.id = String(i) + "," + String(j);
    hiddenBlock.classList.add("hidden");
    _(parentId).appendChild(hiddenBlock);
    _(hiddenBlock.id).addEventListener('click', passCoordinates);

}

async function passCoordinates(id) {

    let coords = returnNumberArray(id.target.id);
    let box = { row: coords[0], column: coords[coords.length - 1] };
    try {

      const response = await fetch(serverURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(box),
      });
  
      if (!response.ok) {
        console.log("Error");
      }

      const result = await response.json();
      _(coords).classList.add(result.type);


    } catch (error) {
      console.log("Server said no");
    }

}
  



