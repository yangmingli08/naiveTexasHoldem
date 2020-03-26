var playerArray = [];

function deal() {
  shuffle();
  playerArray = [];
  document.getElementById('cont').innerHTML = '';
  let content = '';
  const p = parseInt(document.getElementById('numOfPlayer').value);
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
}

function flop() {
  const p = parseInt(document.getElementById('numOfPlayer').value);
  let content = 'Flop: ' + beautify([deck[2 * p + 1], deck[2 * p + 2], deck[2 * p + 3]]);
  let pp = document.createElement("p");
  pp.innerHTML = content;
  document.getElementById('cont').appendChild(pp);
}

function turn() {
  const p = parseInt(document.getElementById('numOfPlayer').value);
  let content = 'Turn: ' + beautify([deck[2 * p + 5]]);
  let pp = document.createElement("p");
  pp.innerHTML = content;
  document.getElementById('cont').appendChild(pp);
}

function river() {
  const p = parseInt(document.getElementById('numOfPlayer').value);
  let content = 'River: ' + beautify([deck[2 * p + 7]]);
  let pp = document.createElement("p");
  pp.innerHTML = content;
  document.getElementById('cont').appendChild(pp);
}

function showdown() {
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
  for (var i = 0; i < p; i++) {
    let temp = new Player(i, playerArray[i], flopArray, turnArray, riverArray);
    playerObjArray.push(temp);
  }
  playerObjArray.sort((a, b) => b.cardValue().rank - a.cardValue().rank);
  let winnie = playerObjArray.reduce((arr, obj) => {
    if (compare(arr[0], obj) === null) {
      if (obj.pid != 0) {
        arr.push(obj);
      }
    } else {
      arr[0] = compare(arr[0], obj);
      for (i = 1; i < arr.length; i++) {
        arr.pop();
      }
    }
    return arr;
  }, [playerObjArray[0]]);
  let pl = document.createElement("p");
  let tableString = '';
  tableString += '<table><tr><th>ID</th><th>Rank</th><th>Value</th><th>card</th></tr>';
  for (i of playerObjArray) {
    tableString += '<tr><td>Player ' + (i.pid + 1) + '</td>';
    tableString += '<td>' + i.cardValue().rank + '</td>';
    tableString += '<td>' + i.cardValue().Value + '</td>';
    tableString += '<td>' + beautify(i.cardValue().highCard.map(c => c.id)) + ' </td>'
    tableString += '</tr>';
  }
  tableString += '</table>';
  pl.innerHTML = tableString;
  document.getElementById('cont').appendChild(pl);
  let wn = document.createElement("p");
  for (i of winnie) {
    console.log('Win index: ' + i.cardValue().highCard.map(c => c.index));
    let s = i.cardValue().highCard.map(c => c.id);
    wn.innerHTML += 'Winner is Player ' + (i.pid + 1) + ' ' + i.cardValue().Value + ': ' + beautify(s) + '<br>';
  }
  document.getElementById('cont').appendChild(wn);
  document.getElementById("numOfPlayer").disabled = false;
}
