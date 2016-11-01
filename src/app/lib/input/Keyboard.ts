import * as $ from "jquery";

export class Keyboard {
  public static create (code: number) {
    return new Keyboard(code);
  }

  private code: number;
  private _isDown: boolean;
  private _isUp: boolean;

  public onPress: Function;
  public onRelease: Function;

  constructor(code: number) {
    this.code = code;

    this._isDown = false;
    this._isUp = true;

    $(window).on("keydown", this.keyDownHandler);
    $(window).on("keyup", this.keyUpHandler);
  }

  public get isDown (): boolean { return  this._isDown; }
  public get isUp (): boolean { return this._isUp; }

  private keyDownHandler = (event: JQueryEventObject) => {
    if (event.keyCode !== this.code)
      return;

    if (this.onPress)
      this.onPress();

    this._isDown = true;
    this._isUp = false;

    event.preventDefault();
  }

  private keyUpHandler = (event: JQueryEventObject) => {
    if (event.keyCode !== this.code)
      return;

    if (this._isDown && this.onRelease)
      this.onRelease();

    this._isDown = false;
    this._isUp = true;

    event.preventDefault();
  }
}