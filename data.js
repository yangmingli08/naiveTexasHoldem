const maxCard = 52;
var deck = [];
for (var i = 0; i < maxCard; i++) {
  deck.push(i);
}

function shuffle() {
  var shufDeck = [];
  for (var i = 0; i < maxCard; i++) {
    let temp = Math.floor(Math.random() * (maxCard - i));
    shufDeck.push(deck[temp]);
    deck[temp] = deck[0];
    deck.shift();
  }
  deck = shufDeck;
}

class Player {
  constructor(pid, hand, flop, turn, river) {
    this.pid = pid;
    this.hand = hand;
    this.flop = flop;
    this.turn = turn;
    this.river = river;
    this.card = hand.concat(flop).concat(turn).concat(river);
    this.cardObj = [];
    for (i in this.card) {
      const c = new CardObj(this.card[i]);
      c.index = parseInt(i);
      this.cardObj.push(c);
    }
  }
  cardValue() {
    return valueCard(this.cardObj);
  }
}
class Value {
  constructor(rank, cardObjArray) {
    this.rank = rank;
    let pName = ''
    switch (rank) {
      case 0:
        pName = 'High Card';
        break;
      case 1:
        pName = 'One Pair';
        break;
      case 2:
        pName = 'Two Pairs';
        break;
      case 3:
        pName = 'Triple';
        break;
      case 4:
        pName = 'Straight';
        break;
      case 5:
        pName = 'Flush';
        break;
      case 6:
        pName = 'Full House';
        break;
      case 7:
        pName = 'Four of A Kind';
        break;
      case 8:
        pName = 'Straight Flush';
        break;
      case 9:
        pName = 'Royal Flush';
        break;
      default:
        break;
    }
    this.Value = pName;
    this.highCard = cardObjArray;
  }
}
class Identifier {
  constructor(flag, cards) {
    this.flag = flag;
    this.cards = cards;
  }
}
class CardObj {
  constructor(id) {
    this.id = id;
    this.suit = cardSuit(id);
    this.num = cardNum(id);
    this.value = cardValue(id);
    this.isAce = id % 13 === 0 ? true : false;
  }
}
