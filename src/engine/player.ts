export interface Player {
  money: number;
  level: number;
}

export function createPlayer() {
  return {
    money: 0,
    level: 1,
  };
}
