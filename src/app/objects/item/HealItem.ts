import { BaseCollisionObject, GameTime } from "../../lib";
import { IDamageable } from "../IDamageable";

import { Player } from "../Player";

export class HealItem extends BaseCollisionObject {
  private power: number = 1;

  constructor () {
    super();

    this.velocity.y = 100;
    this.size.x = this.size.y = 15;
  }

  public hit (damage: number): void {
    this.removeFromScene();
  }

  public onCollide (other: any): void {
    if (other instanceof Player) {
      let player: Player = other as Player;
      player.health += this.power;

      this.removeFromScene();
    }
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);
    
    if (this.position.y > this.scene.canvas.height) {
      this.removeFromScene();
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x / 2, 0, 2*Math.PI);
    ctx.strokeStyle = "#00FFFF";
    ctx.stroke();
  }
}