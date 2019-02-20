import { expect } from "chai";
import "mocha";
import Engine, { GameState } from './engine';
import { AssertionError } from "assert";
import { Client } from 'boardgame.io/client';
import FoodstockClient from './client';
import { Level, CardPosition } from './enums';
import { DeckZone } from './deckzone';

describe("engine", () => {
  it("should level up a player", () => {
    const client = new FoodstockClient();

    expect(client.player(0).level).to.equal(Level.Level1);
    client.moves.levelUp();
    expect(client.player(0).level).to.equal(Level.Level2);

  });


  it("should add a basic Customer from TopDeck when level up a player", () => {
    const client = new FoodstockClient();

    expect(client.player(0).level).to.equal(Level.Level1);
    client.moves.levelUp();
    const card = client.G.customers.basic.deck[0];
    client.moves.gainCustomer(  {which: CardPosition.TopDeck, special: false});


  });
  // it("should prevent placing a helper in the same spot twice", () => {
  //   const client = new FoodstockClient();

  //   client.moves.placeHelper([0, 0, 0]);
  //   client.moves.placeHelper([0, 0, 0]);
  // });
});
