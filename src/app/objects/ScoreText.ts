import { BaseObject, GameTime } from "../lib";
import { KurMath, KurText } from "../lib/util";
import { RefValue } from "../lib/ref";

export class ScoreText extends BaseObject {
  private _score: RefValue<number>;
  private _displayScore: number = 0;
  private _speed: number = 500;

  constructor (_score: RefValue<number>) {
    super();

    this._score = _score;
  }

  public get score () { return this._score; }

  public modifyScore (score: number) {
    this._score.value += score;
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    this._displayScore = KurMath.moveToward(this._displayScore, this.score.value, gameTime.deltaTime * this._speed);
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#FFF";
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText("Score: " + KurText.padLeft(Math.ceil(this._displayScore), "0000000"), this.position.x, this.position.y);
  }
}