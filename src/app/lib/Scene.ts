import * as moment from "moment";

import { BaseObject, BaseCollisionObject, GameTime } from ".";
import { UIBase } from "./ui";

export abstract class Scene {
  private objs: { [index: string]:BaseObject };
  private uiElements: { [index: string]:UIBase };
  protected backgroundColor: string = "#000000";

  public canvas: HTMLCanvasElement;

  constructor (canvas: HTMLCanvasElement) {
    this.objs = {};
    this.uiElements = {};

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

  public addUIElement (uiElement: UIBase) {
    this.uiElements[uiElement.uuid] = uiElement;
    uiElement.scene = this;
  }

  public removeUIElement (uiElement: UIBase) {
    if (!(uiElement.uuid in this.uiElements))
      return;
    delete this.uiElements[uiElement.uuid];
    uiElement.scene = null;
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

    for (let uuid in this.uiElements) {
      let uiElement = this.uiElements[uuid];
      uiElement.onUpdate(gameTime);
    }

    // Remove objects ---------------------------------------------------------/
    // Game Objects
    for (let uuid in this.objs) {
      let obj = this.objs[uuid];
      if (obj.markAsRemove) {
        this.removeObject(obj);
      }
    }
    // UI Elements
    for (let uuid in this.uiElements) {
      let uiElement = this.uiElements[uuid];
      if (uiElement.markAsRemove) {
        this.removeUIElement(uiElement);
      }
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();
    // Draw game objects first
    for (let uuid in this.objs) {
      let obj = this.objs[uuid];
      ctx.save();
      ctx.translate(0.5,0.5);
      obj.onDraw(canvas, ctx);
      if (obj instanceof BaseCollisionObject && obj._showCollider)
        obj.drawCollider(ctx);
      ctx.restore();
    }
    // Then draw UI Elements
    for (let uuid in this.uiElements) {
      let uiElement = this.uiElements[uuid];
      ctx.save();
      ctx.translate(0.5,0.5);
      uiElement.onDraw(canvas, ctx);
      ctx.restore();
    }
  }
}