import * as moment from "moment";

import { BaseObject, BaseCollisionObject, GameTime } from ".";

export abstract class Scene {
  private objs: { [index: string]:BaseObject };
  protected backgroundColor: string = "#000000";

  public canvas: HTMLCanvasElement;

  constructor (canvas: HTMLCanvasElement) {
    this.objs = {};
    this.canvas = canvas;
  }

  public onActive () {}
  public onDeactive () {
    for (let uuid in this.objs) {
      delete this.objs[uuid];
    }
  }

  public addObject (obj: BaseObject) {
    this.objs[obj.uuid] = obj;
    obj.scene = this;
  }

  public removeObject (obj: BaseObject) {
    if (!(obj.uuid in this.objs))
      return;
    delete this.objs[obj.uuid];
    obj.scene = null;
  }

  public onUpdate (gameTime: GameTime) {
    for (let uuid in this.objs) {
      let obj = this.objs[uuid];
      obj.onUpdate(gameTime);
      if (obj instanceof BaseCollisionObject) {
        for (let otherUUID in this.objs) {
          let otherObj = this.objs[otherUUID];
          if (obj === otherObj)
            continue;
          if (obj.isCollidedWith(otherObj))
            obj.onCollide(otherObj);
        }
      }
    }

    for (let uuid in this.objs) {
      let obj = this.objs[uuid];
      if (obj.markAsRemove) {
        delete this.objs[uuid];
        obj.scene = null;
      }
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();
    for (let uuid in this.objs) {
      let obj = this.objs[uuid];
      ctx.save();
      ctx.translate(0.5,0.5);
      obj.onDraw(canvas, ctx);
      if (obj instanceof BaseCollisionObject && obj._showCollider)
        obj.drawCollider(ctx);
      ctx.restore();
    }
  }
}