import { expect } from "chai";
import "mocha";
import Engine from '.';
import { AssertionError } from "assert";
import { Client } from 'boardgame.io/client';

describe("engine", () => {
  it("should level up a player", () => {
    const client = new Client({
      game: Engine,
      numPlayers: 2,
    });

    client.moves.levelUp();
  });
});
