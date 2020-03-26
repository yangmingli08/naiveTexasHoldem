function beautify(deck) {
  const beautifyDeck = [];
  for (i in deck) {
    beautifyDeck[i] = cardGenerator(deck[i]);
  }
  return beautifyDeck;
}

function cardGenerator(card) {
  return cardSuit(card) + cardNum(card);
}

function cardSuit(card) {
  const suit = Math.floor(card / 13);
  switch (suit) {
    case 0:
      return '&spades;';
      break;
    case 1:
      return '&hearts;';
      break;
    case 2:
      return '&clubs;';
      break;
    case 3:
      return '&diams;';
      break;
    default:
      break;
  }
}

function cardNum(card) {
  const value = card % 13;
  switch (value) {
    case 0:
      return 'A';
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return value + 1;
      break;
    case 10:
      return 'J';
      break;
    case 11:
      return 'Q';
      break;
    case 12:
      return 'K';
      break;
    default:
      break;
  }
}

function cardValue(card) {
  const value = card % 13;
  switch (value) {
    case 0:
      return 14;
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return value + 1;
      break;
    default:
      break;
  }
}
