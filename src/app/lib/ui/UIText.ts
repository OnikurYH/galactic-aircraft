import { UIBase, UIElementOptions, TextAlign } from ".";
import { Scene } from "..";
import { Rect } from "../util";

export class UIText extends UIBase {
  protected text: string;

  constructor (scene: Scene, rect: Rect, text: string, opts?: UIElementOptions) {
    super(scene, rect, opts);

    this.text = text;
  }

  protected _getTextAlignOffset (ctx: CanvasRenderingContext2D) {
    let textAlignOffset = 0;
    switch (this.opts.textAlign) {
      case TextAlign.Center:
        textAlignOffset = ctx.measureText(this.text).width / 4;
        break;
      case TextAlign.Right:
        textAlignOffset = ctx.measureText(this.text).width;
        break;
    }
    return textAlignOffset;
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    super.onDraw(canvas, ctx);
    ctx.fillStyle = this.opts.color;
    ctx.font = `${this.opts.fontSize}px ${this.opts.fontFace}`;
    
    ctx.fillText(this.text, this.rect.x + this._getTextAlignOffset(ctx), this.rect.y + (this.rect.height / 2) + (this.opts.fontSize / 4));
  }
}