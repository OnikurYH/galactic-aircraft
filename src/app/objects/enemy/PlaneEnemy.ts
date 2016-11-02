import * as moment from "moment";

import { BaseObject, BaseCollisionObject, GameTime } from "../../lib";
import { IDamageable } from "../IDamageable";
import { BaseEnemy } from "./BaseEnemy";

import { Player } from "../Player";

export class PlaneEnemy extends BaseEnemy {
    private _rotation: number = 0;

    constructor () {
        super (2, 500);

        this.position.x = 100;
        this.velocity.y = 100;

        this.size.x = 30;
        this.size.y = 30;

        //this._showCollider = true;
    }

    public onUpdate (gameTime: GameTime): void {
        super.onUpdate(gameTime);
        this._rotation += gameTime.deltaTime * 100;
    }

    public onDraw (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.translate(this.size.x/2+ this.position.x, this.size.y/2+ this.position.y);
        ctx.rotate((this._rotation)*Math.PI/180);
        ctx.rect(-this.size.x/2 , -this.size.y/2 , this.size.x, this.size.y);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
    }
}