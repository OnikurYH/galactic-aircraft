import * as moment from "moment";
import * as uuid from "node-uuid";

import { Updateable, Scene, GameTime } from ".";
import { Point } from "./util/Point";

export abstract class BaseObject implements Updateable {
  private _uuid: string;
  private _markAsRemove: boolean = false;

  public position: Point;
  public pivot: Point;
  public size: Point;
  public velocity: Point;
  public rotate: number;

  public scene: Scene;

  constructor() {
    this._uuid = uuid.v4();

    this.position = new Point();
    this.pivot = new Point();
    this.size = new Point();
    this.velocity = new Point();
    this.rotate = 0;

    this.scene = null;
  }

  public get uuid () { return this._uuid; }
  public get markAsRemove () { return this._markAsRemove; }

  // public getPivotPosition (): number {
  //   let point: Point = new Point();
  //   point.x = this.position.x 
  // }
  
  public removeFromScene (): void {
    this._markAsRemove = true;
  }

  public onUpdate (gameTime: GameTime): void {
    this.position.x += this.velocity.x * gameTime.deltaTime;
    this.position.y += this.velocity.y * gameTime.deltaTime;
  }
  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {};
}