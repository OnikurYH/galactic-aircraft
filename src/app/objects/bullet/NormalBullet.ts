import * as moment from "moment";

import { BaseBullet } from "./BaseBullet";
import { BaseObject } from "../../lib";

export class NormalBullet extends BaseBullet {
  private speed: number = 230;

  constructor(shootBy: BaseObject) {
    super(shootBy, 1);

    this.size.x = 7;
    this.size.y = 13;

    this.velocity.y = -this.speed;
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.strokeStyle = "#00AA00";
    ctx.stroke();
  }
}