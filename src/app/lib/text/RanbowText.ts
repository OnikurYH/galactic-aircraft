import { BaseObject, GameTime } from "..";
import { TextAlign } from ".";

export class RanbowText extends BaseObject {
  public text: string;
  public font: string;
  public align: TextAlign = TextAlign.Left;

  private _hPerc: number = 0;

  constructor (text: string, font: string = "12px Arial") {
    super();

    this.text = text;
    this.font = font;
  }

  public onUpdate (gameTime: GameTime): void {
    this._hPerc += gameTime.deltaTime * 500;
    if (this._hPerc >= 360)
      this._hPerc = 0;
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {

    ctx.font = this.font;

    let alignOffset = 0;
    switch (this.align) {
      case TextAlign.Center:
        alignOffset = ctx.measureText(this.text).width / 2;
        break;
      case TextAlign.Right:
        alignOffset = ctx.measureText(this.text).width;
        break;
    }
    
    ctx.strokeStyle = `hsl(${this._hPerc}, 100%, 50%)`;
    ctx.strokeText(this.text, this.position.x - alignOffset, this.position.y);
  }
}