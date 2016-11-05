import { UIText, TextAlign, UIElementOptions } from ".";
import { Scene, GameTime } from "..";
import { Rect } from "../util";

export class UIRanbowText extends UIText {
  private _hPerc: number = 0;

  constructor (scene: Scene, rect: Rect, text: string, opts?: UIElementOptions) {
    super(scene, rect, text, opts);
  }

  public onUpdate (gameTime: GameTime): void {
    this._hPerc += gameTime.deltaTime * 500;
    if (this._hPerc >= 360)
      this._hPerc = 0;
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    //super.onDraw(canvas, ctx);
    ctx.strokeStyle = `hsl(${this._hPerc}, 100%, 50%)`;
    ctx.font = `${this.opts.fontSize}px ${this.opts.fontFace}`;
    
    ctx.strokeText(this.text, this.rect.x + this._getTextAlignOffset(ctx), this.rect.y + (this.rect.height / 2) + (this.opts.fontSize / 4));
  }
}