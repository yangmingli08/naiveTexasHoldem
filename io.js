var playerArray;

function deal() {
  playerArray = [];
  deck = shuffle();
  document.getElementById('cont').innerHTML = '';
  let content = '';
  let regex = /^([2-9]|10)$/;
  const p = parseInt(document.getElementById('numOfPlayer').value);
  if (regex.test(p)) {
    document.getElementById("b0").style.visibility = "hidden";
    document.getElementById("b1").style.visibility = "visible";
    document.getElementById("numOfPlayer").disabled = true;
    content += '<table><tr><th>ID</th><th>card</th></tr>';
    for (let i = 0; i < p; i++) {
      content += '<tr><td>Player ' + (i + 1) + '</td><td>' + beautify([deck[i], deck[p + i]]) + '</td></tr>'
      playerArray.push([deck[i], deck[p + i]]);
    }
    content += '</table>';
    let pp = document.createElement("p");
    pp.innerHTML = content;
    document.getElementById('cont').appendChild(pp);
  } else {
    document.getElementById('cont').innerHTML = '<p>Invalid input </p>';
  }
}

function flop() {
  document.getElementById("b1").style.visibility = "hidden";
  document.getElementById("b2").style.visibility = "visible";
  const p = parseInt(document.getElementById('numOfPlayer').value);
  let content = 'Flop: ' + beautify([deck[2 * p + 1], deck[2 * p + 2], deck[2 * p + 3]]);
  let pp = document.createElement("p");
  pp.innerHTML = content;
  document.getElementById('cont').appendChild(pp);
}

function turn() {
  document.getElementById("b2").style.visibility = "hidden";
  document.getElementById("b3").style.visibility = "visible";
  const p = parseInt(document.getElementById('numOfPlayer').value);
  let content = 'Turn: ' + beautify([deck[2 * p + 5]]);
  let pp = document.createElement("p");
  pp.innerHTML = content;
  document.getElementById('cont').appendChild(pp);
}

function river() {
  document.getElementById("b3").style.visibility = "hidden";
  document.getElementById("b4").style.visibility = "visible";
  const p = parseInt(document.getElementById('numOfPlayer').value);
  let content = 'River: ' + beautify([deck[2 * p + 7]]);
  let pp = document.createElement("p");
  pp.innerHTML = content;
  document.getElementById('cont').appendChild(pp);
}

function showdown() {
  document.getElementById("b4").style.visibility = "hidden";
  document.getElementById("b0").style.visibility = "visible";
  const p = parseInt(document.getElementById('numOfPlayer').value);
  const flopArray = [];
  flopArray.push(deck[2 * p + 1]);
  flopArray.push(deck[2 * p + 2]);
  flopArray.push(deck[2 * p + 3]);
  const turnArray = [];
  turnArray.push(deck[2 * p + 5]);
  const riverArray = [];
  riverArray.push(deck[2 * p + 7]);
  const playerObjArray = [];
  for (let i = 0; i < p; i++) {
    let temp = new Player(i, playerArray[i], flopArray, turnArray, riverArray);
    playerObjArray.push(temp);
  }
  for (let i = 1; i < playerObjArray.length; i++) {
    for (let j = 0; j < playerObjArray.length - 1; j++) {
      if (!comparePlayer(playerObjArray[j], playerObjArray[j + 1])) {
        [playerObjArray[j], playerObjArray[j + 1]] = [playerObjArray[j + 1], playerObjArray[j]];
      }
    }
  }
  let pl = document.createElement("p");
  let tableString = '';
  tableString += '<table><tr><th>ID</th><th>Rank</th><th>Value</th><th>card</th></tr>';
  for (const i of playerObjArray) {
    tableString += '<tr><td>Player ' + (i.pid + 1) + '</td>';
    tableString += '<td>' + i.cardValue().rank + '</td>';
    tableString += '<td>' + i.cardValue().value + '</td>';
    tableString += '<td>' + beautify(i.cardValue().highCard.map(c => c.id)) + ' </td>'
    tableString += '</tr>';
  }
  tableString += '</table>';
  pl.innerHTML = tableString;
  document.getElementById('cont').appendChild(pl);
  const resultArray = [
    [playerObjArray[0]]
  ];
  let ladder = 0;
  for (let i = 0; i < playerObjArray.length - 1; i++) {
    if (comparePlayer(playerObjArray[i], playerObjArray[i + 1]) === null) {
      resultArray[ladder].push(playerObjArray[i + 1]);
    } else {
      resultArray.push([]);
      ladder++;
      resultArray[ladder].push(playerObjArray[i + 1]);
    }
  }
  let wn = document.createElement("div");
  for (const i of resultArray[0]) {
    console.log('Win index: ' + i.cardValue().highCard.map(c => c.index));
    let s = i.cardValue().highCard.map(c => c.id);
    wn.innerHTML += '<p>Winner is Player ' + (i.pid + 1) + ' ' + i.cardValue().value + ': ' + beautify(s) + '</p>';
  }
  document.getElementById('cont').appendChild(wn);
  document.getElementById("numOfPlayer").disabled = false;
}
