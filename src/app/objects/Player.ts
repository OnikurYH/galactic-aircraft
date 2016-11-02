import * as moment from "moment";

import { IBulletHitListener, BaseBullet, NormalBullet } from "./bullet";

import { BaseObject, BaseCollisionObject, GameTime } from "../lib";
import { KurMath } from "../lib/util";
import { RefValue } from "../lib/ref";

import { BaseEnemy } from "./enemy";
import { IDamageable } from ".";
import { Keyboard } from "../lib/input/Keyboard";

export class Player extends BaseCollisionObject implements IDamageable, IBulletHitListener {
  private speed: number = 170;
  public maxHealth: number = 5;
  private _health: number = this.maxHealth;
  private _score: RefValue<number> = RefValue.create(0);

  // Shoot --------------------------------------------------------------------/
  private fireRate = 0.5;
  private lastFireTime: number = 0.0;

  // Keyboard -----------------------------------------------------------------/
  private keyboardSpace: Keyboard;
  private keyboardLeft: Keyboard;
  private keyboardUp: Keyboard;
  private keyboardRight: Keyboard;
  private keyboardDown: Keyboard;

  constructor () {
    super();

    this.size.x = 35;
    this.size.y = 20;

    this.keyboardSpace = Keyboard.create(32);
    this.keyboardLeft = Keyboard.create(37);
    this.keyboardUp = Keyboard.create(38);
    this.keyboardRight = Keyboard.create(39);
    this.keyboardDown = Keyboard.create(40);

    //this._showCollider = true;
  }

  public get health (): number { return this._health; }
  public set health (value: number) {
    this._health = value;
    if (this._health > this.maxHealth)
      this._health = this.maxHealth;
  }

  public get score (): RefValue<number> { return this._score; }

  public hit(source: any, damage: number): boolean {
    this.health -= damage;
    if (this.health <= 0) {
      this.removeFromScene();
      return true;
    }
    return false;
  }

  public onCollide (other: BaseObject): void {
    //console.log("Collide with", other);
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    this.handleMovemont();
    this.handleShooting(gameTime);
  }

  // Movement
  private handleMovemont (): void {
    if (this.keyboardLeft.isDown)
      this.velocity.x = KurMath.lerp(this.velocity.x, -this.speed, 0.1);
    else if (this.keyboardRight.isDown)
      this.velocity.x = KurMath.lerp(this.velocity.x, this.speed, 0.1);
    else
      this.velocity.x = KurMath.lerp(this.velocity.x, 0, 0.1);

    if (this.keyboardUp.isDown)
      this.velocity.y = KurMath.lerp(this.velocity.y, -this.speed, 0.1);
    else if (this.keyboardDown.isDown)
      this.velocity.y = KurMath.lerp(this.velocity.y, this.speed, 0.1);
    else
      this.velocity.y = KurMath.lerp(this.velocity.y, 0, 0.1);

    this.position.x = KurMath.clamp(this.position.x, 0, this.scene.canvas.width - this.size.x - 1);
    this.position.y = KurMath.clamp(this.position.y, 0, this.scene.canvas.height - this.size.y - 1);
  }

  // Shooting
  private handleShooting (gameTime: GameTime): void {
    if (this.keyboardSpace.isDown) {
      if ((gameTime.time - this.lastFireTime) > (this.fireRate)) {
        this.shootBullet();
        this.lastFireTime = gameTime.time;
      }
    }
  }

  private shootBullet () {
    let bullet = new NormalBullet(this);
    bullet.position.x = this.position.x + this.size.x / 2 - bullet.size.x / 2;
    bullet.position.y = this.position.y - this.size.y / 2;
    this.scene.addObject(bullet);
  }

  public onBulletHit (hit: any, damage: number): void {
    if (hit instanceof BaseEnemy) {
      this._score.value += (hit as BaseEnemy).earnScore;
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y + this.size.y - 10, this.size.x, 10);
    ctx.rect(this.position.x + this.size.x / 2 - 3.5, this.position.y, 7, 10);
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}