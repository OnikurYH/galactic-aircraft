import * as uuid from "node-uuid";

import { UIElementOptions, getUIElementOptionsDefaults, MouseRectListener } from ".";
import { Scene, GameTime } from "..";
import { Rect } from "../util";

export class UIBase {
  private _uuid: string;
  private _markAsRemove: boolean = false;

  public rect: Rect;
  public scene: Scene;
  public opts: UIElementOptions;

  constructor (scene: Scene, rect: Rect, opts: UIElementOptions = getUIElementOptionsDefaults()) {
    this._uuid = uuid.v4();

    this.scene = scene;
    this.rect = rect;
    this.opts = opts;
  }

  public get uuid () { return this._uuid; }
  public get markAsRemove () { return this._markAsRemove; }

  public removeFromScene (): void {
    this._markAsRemove = true;
  }

  public onUpdate (gameTime: GameTime): void {

  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.opts.backgroundColor;
    ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    ctx.fill();
  }
}