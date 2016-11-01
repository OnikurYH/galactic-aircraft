import * as moment from "moment";

import { BaseCollisionObject, GameTime } from "../../lib";
import { IDamageable } from "../IDamageable";

import { Player } from "../Player";

export abstract class BaseBullet extends BaseCollisionObject {
  protected damage: number;

  constructor () {
    super();
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    if (this.position.y < -this.size.y)
      this.removeFromScene();
  }

  public onCollide (other: any): void {
    if ((other as IDamageable).hit !== undefined && !(other instanceof Player)) {
      (other as IDamageable).hit(1);
      this.removeFromScene();
    }
  }
}