import * as moment from "moment";
import { KurMath, Rect } from "../lib/util";

import { Scene, GameTime } from "../lib";
import { TextAlign, RanbowText } from "../lib/text";
import { Button } from "../lib/ui";

import { Player, HealthBar, ScoreText } from "../objects";
import { EnemySpawner } from "../objects/enemy/EnemySpawner";
import { ItemSpawner } from "../objects/item";
import { StarBackground } from "../objects/background/StarBackground";

export class GameScene extends Scene {
  private player: Player;
  private playerHealthBar: HealthBar;
  private playerScoreText: ScoreText;

  private enemySpawner: EnemySpawner;

  private starBackground: StarBackground;

  private isParse: boolean = false;
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

    let btnParse: Button;
    this.addUIElement(btnParse = new Button(this, Rect.make(10, 80, 100, 30), "Pause", {
      backgroundColor: "#333",
      color: "#FFF",
      fontSize: 16,
      fontFace: "Arial"
    }));
    btnParse.onMouseUp = () => {
      this.isParse = true;

      btnParse.interactive = false;
      let parseOverlay: Button;
      this.addUIElement(parseOverlay = new Button(this, Rect.make(0, 0, this.canvas.width, this.canvas.height), "Press to resume", {
        backgroundColor: "rgba(0,80,50,0.5)",
        color: "#FFF",
        fontSize: 25,
        fontFace: "'Press Start 2P'"
      }));
      parseOverlay.onMouseUp = () => {
        this.isParse = false;
        btnParse.interactive = true;
        parseOverlay.removeFromScene();
      }
    };
  }

  public onUpdate (gameTime: GameTime): void {
    if (this.isParse)
      return;

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