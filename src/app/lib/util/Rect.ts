import { Point } from ".";

export class Rect {
  //public static make(): Rect;
  public static make(x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rect {
    return new Rect(x, y, width, height);
  }

  constructor (public x: number, public y: number, public width: number, public height: number) {

  }

  isInset (x: number, y: number) {
    return x > this.x && x < this.x+this.width && y < this.y+this.height && y > this.y;
  }
}