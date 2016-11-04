import * as $ from "jquery";

import { UIBase, UIElementOptions, getUIElementOptionsDefaults, MouseRectListener } from ".";
import { Updateable, GameTime, Scene } from "..";
import { Rect } from "../util";
import { MousePointer } from "../input";

export class Button extends UIBase implements Updateable {
  private _mouseRectListener: MouseRectListener;

  public text: string = "";

  constructor (scene: Scene, rect: Rect, text: string, opts?: UIElementOptions) {
    super(scene, rect, opts);

    this.text = text;

    this._mouseRectListener = new MouseRectListener($(this.scene.canvas), this.rect);
  }

  public set interactive(value: boolean) {
    this._mouseRectListener.interactive = value;
  }

  public set onMouseUp (value: () => void) {
    this._mouseRectListener.onMouseUp = value;
  }

  public removeFromScene (): void {
    super.removeFromScene();
    this._mouseRectListener.cleanup();
  }

  public onUpdate (gameTime: GameTime): void {

  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    super.onDraw(canvas, ctx);
    if (this._mouseRectListener.isActiving) {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }
    ctx.fillStyle = this.opts.color;
    ctx.font = `${this.opts.fontSize}px ${this.opts.fontFace}`;
    ctx.fillText(this.text, this.rect.x + (this.rect.width / 2) - (ctx.measureText(this.text).width / 2), this.rect.y + (this.rect.height / 2) + (this.opts.fontSize / 4), this.rect.width);
  }
}