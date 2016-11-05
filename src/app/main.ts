/*!
 * Galactic Aircraft
 * @description A galactic shooting game in HTML5 Canvas
 * @author OnikurYH
 * @license GPL-v3
 */

import * as $ from "jquery";
import * as moment from "moment";

import { Scene, GameTime } from "./lib";
import { MousePointer } from "./lib/input";

import { GameScene } from "./scenes/GameScene";

class Main {
  private currentScene: Scene;
  private gameTime: GameTime;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor () {
    this.gameTime = new GameTime();

    let mainCanvas = $("#mainCanvas");
    MousePointer.initWithListenElement(mainCanvas);

    this.canvas = <HTMLCanvasElement> mainCanvas[0];
    this.ctx = this.canvas.getContext("2d");
    (<any> this.ctx).imageSmoothingEnabled = false;

    this.prepare();
    this.tick();
    this.toScene(new GameScene(this.canvas));
  }

  private prepare () {
    this.gameTime.init();
  }

  public toScene (scene: Scene) {
    if (this.currentScene != null)
      this.currentScene.onDeactive();

    this.currentScene = scene;
    this.currentScene.onActive();
  }

  public tick = () => {
    window.requestAnimationFrame(this.tick);
    this.gameTime.update();

    if (this.currentScene != null) {
      this.currentScene.onDraw(this.canvas, this.ctx);
      this.currentScene.onUpdate(this.gameTime);
      
      //this.renderer.render(this.currentScene.container);
    }
  }
}

new Main();