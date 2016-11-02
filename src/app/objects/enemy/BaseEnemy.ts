import * as moment from "moment";

import { BaseCollisionObject, GameTime } from "../../lib";
import { Player } from "../Player";
import { IDamageable } from "../IDamageable";

export abstract class BaseEnemy extends BaseCollisionObject implements IDamageable {
  private _health: number;
  private _earnScore: number;

  constructor (health: number, earnScore: number) {
    super ();

    this._health = health;
    this._earnScore = earnScore;
  }

  public get earnScore () { return this._earnScore; }

  public hit (source: any, damage: number): boolean {
    this._health -= damage;
    if (this._health <= 0) {
      this.removeFromScene();
      return true;
    }
    return false;
  }

  public onCollide (other: any): void {
    if ((other as IDamageable).hit !== undefined && (other instanceof Player)) {
      (other as IDamageable).hit(this, 1);
      this.removeFromScene();
    }
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);
    
    if (this.position.y > this.scene.canvas.height) {
      this.removeFromScene();
    }
  }
}