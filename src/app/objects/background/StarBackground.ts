import * as moment from "moment";
import { KurMath } from "../../lib/util";

import { BaseObject, GameTime } from "../../lib";

export class StarBackground extends BaseObject {
  private stars: Star[];

  private spawnRate: number = 0.1;
  private lastSpawnTime: number = 0;

  constructor () {
    super();

    this.stars = [];
  }

  public offsetStars (x: number): void {
    if (x > -0.5 && x < 0.5)
      return;

    for (let star of this.stars) {
      star.velocity.x = (star.size.x * -x) * 0.2;
    }
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    if ((gameTime.time - this.lastSpawnTime) > this.spawnRate) {

      let star = new Star();
      star.position.x = KurMath.randomRange(0, this.scene.canvas.width);
      this.scene.addObject(star);
      this.stars.push(star);

      this.lastSpawnTime = gameTime.time;
    }

    for (let i = this.stars.length - 1; i >= 0; i--) {
      if (this.stars[i].markAsRemove)
        this.stars.splice(i, 1);
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {}
}

export class Star extends BaseObject {
  constructor () {
    super();

    this.size.x = this.size.y = KurMath.randomRange(1, 5);
    this.velocity.y = (this.size.x / 1.5) * 120;
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    if (this.position.y > this.scene.canvas.height) {
      this.removeFromScene();
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.strokeStyle = "#AAAA00";
    ctx.stroke();
  }
}