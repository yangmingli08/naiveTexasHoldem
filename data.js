class Player {
  constructor(pid, hand, flop, turn, river) {
    this.pid = pid;
    this.hand = hand;
    this.flop = flop;
    this.turn = turn;
    this.river = river;
    this.card = hand.concat(flop).concat(turn).concat(river);
    this.cardObj = [];
    for (const i in this.card) {
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
    const name = {
      0: 'High Card',
      1: 'One Pair',
      2: 'Two Pairs',
      3: 'Triple',
      4: 'Straight',
      5: 'Flush',
      6: 'Full House',
      7: 'Four of A Kind',
      8: 'Straight Flush',
      9: 'Royal Flush'
    }
    this.value = name[rank];
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
    this.char = cardChar(id);
    this.value = cardValue(id);
    this.isAce = id % 13 === 0 ? true : false;
  }
}
