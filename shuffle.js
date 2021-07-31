var deck = [];

const shuffle = () => {
  const maxCard = 52;
  const input = [];
  const output = [];
  for (let i = 0; i < maxCard; i++) {
    input.push(i);
  }
  for (let i = 0; i < maxCard; i++) {
    output.push(input.splice(Math.floor(Math.random() * (maxCard - i)), 1)[0]);
  }
  return output;
}

// shuffle() {
//     const { deck } = this;
//     let m = deck.length, i;
//
//     while (m) {
//       i = Math.floor(Math.random() * m--);
//
//       [deck[m], deck[i]] = [deck[i], deck[m]];
//     }
//
//     return this;
//   }



const beautify = (deck) => {
  const beautifyDeck = [];
  for (const i in deck) {
    beautifyDeck[i] = cardGenerator(deck[i]);
  }
  return beautifyDeck;
}

const cardGenerator = (card) => cardSuit(card) + cardChar(card)

const cardValue = (card) => card % 13 === 0 ? 14 : card % 13 + 1

const cardSuit = (card) => {
  const suit = Math.floor(card / 13);
  const suitObj = {
    0: '&spades;',
    1: '&hearts;',
    2: '&clubs;',
    3: '&diams;'
  };
  return suitObj[suit];
}

const cardChar = (card) => {
  const char = card % 13;
  const charObj = {
    0: 'A',
    1: '2',
    2: '3',
    3: '4',
    4: '5',
    5: '6',
    6: '7',
    7: '8',
    8: '9',
    9: '10',
    10: 'J',
    11: 'Q',
    12: 'K'
  }
  return charObj[char];
}
