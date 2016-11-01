import { GameTime } from ".";

export interface Updateable {
  onUpdate (gameTime: GameTime): void;
}