import { Client } from 'boardgame.io/client';
import Engine from './engine';
import { Player } from './player';

export default class FoodstockClient {
  client: Client;

  constructor() {
    this.client = new Client({
      game: Engine,
      numPlayers: 2,
    });
  }

  get G() {
    return this.client.getState().G;
  }

  get ctx() {
    return this.client.getState().ctx;
  }

  get moves() {
    return this.client.moves;
  }

  get phases() {
    return this.client.phases;
  }

  player(id: string | number): Player {
    return this.G.players[id];
  }
}
