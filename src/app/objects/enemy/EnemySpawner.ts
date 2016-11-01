import * as moment from "moment";

import { BaseObject, GameTime } from "../../lib";
import { KurMath } from "../../lib/util";
import { BaseEnemy } from "./BaseEnemy";
import { PlaneEnemy } from "./PlaneEnemy";
import { CircleEnemy } from "./CircleEnemy";

export class EnemySpawner extends BaseObject {
  private spawnRate: number = 1;
  private types: Function[] = [PlaneEnemy, CircleEnemy];
  private lastSpawnTime: number = -2;

  constructor () {
    super();
  }

  onUpdate (gameTime: GameTime): void {
    if ((gameTime.time - this.lastSpawnTime) > (this.spawnRate)) {
      this.spawnEnemy();
      this.lastSpawnTime = gameTime.time;
    }
  }

  private spawnEnemy () {
    let enemyType: any =  this.types[KurMath.randomRange(0, this.types.length - 1)];
    let enemy: BaseEnemy = new enemyType();
    enemy.position.y = -enemy.size.y;
    enemy.position.x = KurMath.randomRange(0, this.scene.canvas.width - enemy.size.x);
    this.scene.addObject(enemy);
  }
}