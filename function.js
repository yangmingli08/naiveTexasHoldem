function comparePlayer(p0, p1) {
  // NOTE: Input p0 p1 are {Player}
  // NOTE: Return null if same, otherwise return p0 > p1 ? true : false;
  const a0 = p0.cardValue().rank;
  const a1 = p0.cardValue().highCard;
  const b0 = p1.cardValue().rank;
  const b1 = p1.cardValue().highCard;
  if (a0 === b0) {
    if (campareObjArray(a1, b1) === null) {
      return null;
    } else {
      return campareObjArray(a1, b1) ? true : false;
    }
  } else return a0 > b0 ? true : false;
}

function campareObjArray(hc0, hc1) {
  // NOTE: Input hc0 hc1 are {CardObj} Array
  // NOTE: Return null if same, otherwise return hc0 > hc1 ? true : false;
  const arr0 = hc0.map(c => c.value);
  const arr1 = hc1.map(c => c.value);
  for (const i in arr0) {
    if (arr0[i] > arr1[i]) {
      return true;
    } else if (arr0[i] < arr1[i]) {
      return false;
    } else {
      if (i === arr0.length - 1) {
        return null;
      }
    }
  }
}

function trim(cards) {
  if (cards.length < 6) {
    return cards;
  } else {
    cards.pop();
    return trim(cards);
  }
}

function valueCard(cardObjArray) {
  if (isFlush(cardObjArray).flag) {
    if (isStraight(isFlush(cardObjArray).cards).flag) {
      if (isStraight(isFlush(cardObjArray).cards).cards[0].value === 14) {
        return new Value(9, trim(isStraight(isFlush(cardObjArray).cards).cards));
      } else {
        return new Value(8, trim(isStraight(isFlush(cardObjArray).cards).cards));
      }
    } else {
      return new Value(5, trim(isFlush(cardObjArray).cards));
    }
  } else {
    if (isStraight(cardObjArray).flag) {
      return new Value(4, trim(isStraight(cardObjArray).cards));
    } else {
      if (isFour(cardObjArray).flag) {
        return new Value(7, trim(isFour(cardObjArray).cards));
      } else {
        if (isHouse(cardObjArray).flag) {
          return new Value(6, trim(isHouse(cardObjArray).cards));
        } else {
          if (isThree(cardObjArray).flag) {
            return new Value(3, trim(isThree(cardObjArray).cards));
          } else {
            if (isDoublePair(cardObjArray).flag) {
              return new Value(2, trim(isDoublePair(cardObjArray).cards));
            } else {
              if (isPair(cardObjArray).flag) {
                return new Value(1, trim(isPair(cardObjArray).cards));
              } else {
                return new Value(0, trim(highCard(cardObjArray).cards));
              }
            }
          }
        }
      }
    }
  }
}

function isFlush(cardObjArray) {
  const identifier = new Identifier(false, []);
  cardObjArray.sort((a, b) => b.value - a.value);
  const s = cardObjArray.filter(card => card.suit === '&spades;');
  const c = cardObjArray.filter(card => card.suit === '&clubs;');
  const h = cardObjArray.filter(card => card.suit === '&hearts;');
  const d = cardObjArray.filter(card => card.suit === '&diams;');
  if (s.length > 4 || c.length > 4 || h.length > 4 || d.length > 4) {
    identifier.flag = true;
    if (s.length > 4) {
      identifier.cards = s;
    }
    if (c.length > 4) {
      identifier.cards = c;
    }
    if (h.length > 4) {
      identifier.cards = h;
    }
    if (d.length > 4) {
      identifier.cards = d;
    }
  }
  return identifier;
}

function isStraight(cardObjArray) {
  const identifier = new Identifier(false, []);
  cardObjArray.sort((a, b) => b.value - a.value);
  const a = cardObjArray.filter(card => card.isAce === true);
  if (a.length > 0) {
    for (const i of a) {
      const ace = new CardObj(i.id);
      ace.index = i.index;
      ace.value = 1;
      cardObjArray.push(ace);
    }
  }
  let straightCard = [cardObjArray[0]];
  for (let i = 0; i < cardObjArray.length - 1; i++) {
    if (cardObjArray[i].value === cardObjArray[i + 1].value) {
      continue;
    } else if (cardObjArray[i].value - 1 === cardObjArray[i + 1].value) {
      straightCard.push(cardObjArray[i + 1]);
      if (straightCard.length > 4) {
        identifier.flag = true;
        identifier.cards = straightCard;
      }
    } else {
      straightCard = [cardObjArray[i + 1]]
    }
  }
  if (a.length > 0) {
    for (const i in a) {
      cardObjArray.pop();
    }
  }
  return identifier;
}

function stackCards(cardObjArray) {
  const indexArray = [];
  const resultArray = [];
  for (let i = 2; i < 15; i++) {
    const tempArray = cardObjArray.filter(card => card.value === i);
    indexArray.push(tempArray);
  }
  for (let i = 4; i > 0; i--) {
    const tempArray = indexArray.reduce((arr, obj) => {
      if (obj.length === i) {
        arr.push(obj);
      }
      return arr;
    }, []);
    resultArray.push(tempArray);
  }
  return resultArray;
}

function isFour(cardObjArray) {
  const identifier = new Identifier(false, []);
  const stack = stackCards(cardObjArray);
  if (stack[0].length > 0) {
    identifier.flag = true;
    identifier.cards = stack[0][0];
    let tempArray = [];
    for (let i = 1; i < 4; i++) {
      for (const j in stack[i]) {
        for (const k of stack[i][j])
          tempArray.push(k);
      }
    }
    tempArray.sort((a, b) => b.value - a.value);
    identifier.cards = [...identifier.cards, ...tempArray];
  }
  return identifier;
}

function isHouse(cardObjArray) {
  const identifier = new Identifier(false, []);
  const stack = stackCards(cardObjArray);
  if (stack[1].length === 2) {
    identifier.flag = true;
    for (const j in stack[1]) {
      for (const k of stack[1][j])
        identifier.cards.push(k);
    }
    identifier.cards.sort((a, b) => b.value - a.value);
  }
  if (stack[1].length === 1 && stack[2].length > 0) {
    identifier.flag = true;
    for (const j in stack[1]) {
      for (const k of stack[1][j])
        identifier.cards.push(k);
    }
    let tempArray = [];
    for (const j in stack[2]) {
      for (const k of stack[2][j])
        tempArray.push(k);
    }
    tempArray.sort((a, b) => b.value - a.value);
    identifier.cards = [...identifier.cards, ...tempArray];
  }
  return identifier;
}

function isThree(cardObjArray) {
  const identifier = new Identifier(false, []);
  const stack = stackCards(cardObjArray);
  if (stack[1].length === 1) {
    identifier.flag = true;
    for (const j in stack[1]) {
      for (const k of stack[1][j])
        identifier.cards.push(k);
    }
    let tempArray = [];
    for (let i = 2; i < 4; i++) {
      for (const j in stack[i]) {
        for (const k of stack[i][j])
          tempArray.push(k);
      }
    }
    tempArray.sort((a, b) => b.value - a.value);
    identifier.cards = [...identifier.cards, ...tempArray];
  }
  return identifier;
}

function isDoublePair(cardObjArray) {
  const identifier = new Identifier(false, []);
  const stack = stackCards(cardObjArray);
  if (stack[2].length > 1) {
    identifier.flag = true;
    for (const j in stack[2]) {
      for (const k of stack[2][j])
        identifier.cards.push(k);
    }
    identifier.cards.sort((a, b) => b.value - a.value);
    for (const j in stack[3]) {
      for (const k of stack[3][j])
        identifier.cards.push(k);
    }
    let tempArray = [];
    for (let i = 0; i < 3; i++) {
      tempArray.push(identifier.cards.pop());
    }
    tempArray.sort((a, b) => b.value - a.value);
    identifier.cards = [...identifier.cards, ...tempArray];
  }
  return identifier;
}

function isPair(cardObjArray) {
  const identifier = new Identifier(false, []);
  const stack = stackCards(cardObjArray);
  if (stack[2].length === 1) {
    identifier.flag = true;
    for (const j in stack[2]) {
      for (const k of stack[2][j])
        identifier.cards.push(k);
    }
    let tempArray = [];
    for (let i = 3; i < 4; i++) {
      for (const j in stack[i]) {
        for (const k of stack[i][j])
          tempArray.push(k);
      }
    }
    tempArray.sort((a, b) => b.value - a.value);
    identifier.cards = [...identifier.cards, ...tempArray];
  }
  return identifier;
}

function highCard(cardObjArray) {
  const identifier = new Identifier(true, cardObjArray.sort((a, b) => b.value - a.value));
  return identifier;
}
