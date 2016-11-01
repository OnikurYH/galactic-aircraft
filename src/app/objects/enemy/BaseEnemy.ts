import * as moment from "moment";

import { BaseCollisionObject, GameTime } from "../../lib";
import { IDamageable } from "../IDamageable";

export abstract class BaseEnemy extends BaseCollisionObject implements IDamageable {
  private _health: number;

  constructor (health: number) {
    super ();

    this._health = health;
  }

  public hit (damage: number): void {
    this._health -= damage;
    if (this._health <= 0)
      this.removeFromScene();
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);
    
    if (this.position.y > this.scene.canvas.height) {
      this.removeFromScene();
    }
  }
}