import { BaseObject, BaseCollisionObject, GameTime } from "../../lib";
import { IDamageable } from "../IDamageable";
import { BaseEnemy } from "./BaseEnemy";

import { Player } from "../Player";

export class CircleEnemy extends BaseEnemy {
  constructor () {
    super(1, 800);

    this.velocity.y = 330;

    this.size.x = 30;
    this.size.y = 30;
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x / 2, 0, 2*Math.PI);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
  }
}