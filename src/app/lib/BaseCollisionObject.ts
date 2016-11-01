import { BaseObject } from "./BaseObject";

export abstract class BaseCollisionObject extends BaseObject {
  public _showCollider: boolean = false;

  constructor () {
    super ();
  } 

  public isCollidedWith (other: BaseObject): boolean {
    let dX = other.position.x - this.position.x;
    let dY = other.position.y - this.position.y;

    //console.log("Check", dX, dY, other.size.x, other.size.y);

    return (dX > -other.size.x && dX < other.size.x &&
        dY > -other.size.y && dY < other.size.y)
  }

  public abstract onCollide (other: any): void;

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    
  }

  public drawCollider (ctx: CanvasRenderingContext2D): void {
    if (this._showCollider) {
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}