import * as moment from "moment";

import { BaseObject, BaseCollisionObject, GameTime } from "../../lib";
import { IDamageable } from "../IDamageable";

import { IBulletHitListener } from ".";

export abstract class BaseBullet extends BaseCollisionObject {
  protected shootBy: any;
  protected damage: number;

  constructor (shootBy: any, damage: number) {
    super();
    this.shootBy = shootBy;
    this.damage = damage;
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    if (this.position.y < -this.size.y)
      this.removeFromScene();
  }

  public onCollide (other: any): void {
    if ((other as IDamageable).hit != undefined && other !== this.shootBy) {
      if ((other as IDamageable).hit(this, this.damage) &&(this.shootBy as IBulletHitListener).onBulletHit != undefined) {
        (this.shootBy as IBulletHitListener).onBulletHit(other, this.damage);
      }

      this.removeFromScene();
    }
  }
}