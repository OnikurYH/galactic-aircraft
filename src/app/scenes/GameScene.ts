import * as moment from "moment";
import { KurMath } from "../lib/util";

import { Scene, GameTime } from "../lib";
import { TextAlign, RanbowText } from "../lib/text";

import { Player } from "../objects/Player";
import { HealthBar } from "../objects/HealthBar";
import { ScoreText } from "../objects/ScoreText";
import { EnemySpawner } from "../objects/enemy/EnemySpawner";
import { ItemSpawner } from "../objects/item";
import { StarBackground } from "../objects/background/StarBackground";

export class GameScene extends Scene {
  private player: Player;
  private playerHealthBar: HealthBar;
  private playerScoreText: ScoreText;

  private enemySpawner: EnemySpawner;

  private starBackground: StarBackground;

  private isGameOver: boolean = false;

  constructor (canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public onActive () {
    this.player = new Player();
    this.player.position.x = this.canvas.width / 2 - this.player.size.x / 2;
    this.player.position.y = this.canvas.height - this.player.size.y - 10;
    this.addObject(this.player);

    this.addObject(this.enemySpawner = new EnemySpawner());
    this.addObject(new ItemSpawner());

    this.addObject(this.playerScoreText = new ScoreText(this.player.score));
    this.playerScoreText.position.x = 15;
    this.playerScoreText.position.y = 30;
    this.addObject(this.playerHealthBar = new HealthBar(this.player));
    this.playerHealthBar.position.x = 350;
    this.playerHealthBar.position.y = 10;

    this.addObject(this.starBackground = new StarBackground())
  }

  public onUpdate (gameTime: GameTime): void {
    super.onUpdate(gameTime);

    this.starBackground.offsetStars(this.player.velocity.x);

    if (this.player.health <= 0 && !this.isGameOver) {
      this.isGameOver = true;
      let lbGameover: RanbowText;
      this.addObject(lbGameover = new RanbowText("Game over", "36px 'Press Start 2P'"));
      lbGameover.align = TextAlign.Center;
      lbGameover.position.x = this.canvas.width / 2;
      lbGameover.position.y = this.canvas.height / 2;
    }
  }

  public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super.onDraw(canvas, ctx);

    ctx.save();

    ctx.font = "12px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Use arrow to control your aircraft", 10, 48);
    ctx.fillText("Press space to shoot", 10, 68);

    ctx.restore();
  }
}