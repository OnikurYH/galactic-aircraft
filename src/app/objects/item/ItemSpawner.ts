import * as moment from "moment";

import { BaseObject, GameTime } from "../../lib";
import { KurMath } from "../../lib/util";
import { ItemBase, HealItem } from ".";

export class ItemSpawner extends BaseObject {
  private spawnRate: number = 10;
  private types: Function[] = [HealItem];
  private lastSpawnTime: number = 0;

  constructor () {
    super();
  }

  onUpdate (gameTime: GameTime): void {
    if ((gameTime.time - this.lastSpawnTime) > (this.spawnRate)) {
      this.spawnItem();
      this.lastSpawnTime = gameTime.time;
    }
  }

  private spawnItem () {
    let type: any =  this.types[KurMath.randomRange(0, this.types.length - 1)];
    let item: ItemBase = new type();
    item.position.y = -item.size.y;
    item.position.x = KurMath.randomRange(0, this.scene.canvas.width - item.size.x);
    this.scene.addObject(item);
  }
}