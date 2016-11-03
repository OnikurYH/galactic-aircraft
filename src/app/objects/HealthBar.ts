import { BaseObject, GameTime } from "../lib";

import { Player } from "./Player";


export class HealthBar extends BaseObject {
  private _player: Player;

  constructor (player: Player) {
    super();

    this._player = player;

    this.size.x = 140;
    this.size.y = 20;
  }

  public onUpdate(gameTime: GameTime): void {

  }

  public onDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#FFF";
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText("HP", this.position.x - 37, this.position.y + 18);

    let eachBlockWidth = this.size.x / this._player.maxHealth;

    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.strokeStyle = "#0F0";

    for (let i = 0; i < this._player.maxHealth; i++) {
      ctx.strokeRect(this.position.x + (eachBlockWidth * i), this.position.y, eachBlockWidth, this.size.y);
      if (i < this._player.health) {
        ctx.fillRect(this.position.x + (eachBlockWidth * i), this.position.y, eachBlockWidth, this.size.y);
      }
    }
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}