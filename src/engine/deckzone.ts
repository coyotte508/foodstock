import * as assert from "assert";

export interface DeckZone<T = any> {
  discard: T[];
  deck: T[];
  available: T[];
  visible: number;
}

export namespace DeckZone {
  export function show<T>(zone: DeckZone<T>) {
    const n = Math.min(zone.visible, zone.deck.length);

    zone.available = [...zone.available, ...zone.deck.slice(0, n)];
    zone.deck = zone.deck.slice(n);
  }

  export function clear<T>(zone: DeckZone<T>) {
    zone.discard = [...zone.discard, ...zone.available];
  }

  export function draw<T>(zone: DeckZone<T>, n: number): T[] {
    n = Math.min(n, zone.deck.length);

    const ret = zone.deck.slice(0, n);
    zone.deck = zone.deck.slice(n);

    return ret;
  }

  export function pick<T>(zone: DeckZone<T>, position: number) {
    const [card] = zone.available.splice(position, 1);

    assert (card !== undefined);

    return card;
  }
}
