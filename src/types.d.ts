import { GameState } from "./engine/engine";
import Context from "./engine/context";

declare module 'vue/types/vue' {
  interface Vue {
    $game: GameState;
    $context: Context;
    $dragged: string;
    $clearHighlights: () => void;
    $clearDrag: () => void;
  }
}
