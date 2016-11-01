import * as moment from "moment";

export class GameTime {
  private _time: number;
  private _deltaTime: number;
  private _lastUpdate: moment.Moment;

  constructor () {

  }

  public get time (): number { return this._time; }

  public get deltaTime (): number { return this._deltaTime; }

  public init (): void {
    this._time = 0.0;
    this._deltaTime = 0.0;
    this._lastUpdate = moment();
  }

  public update (): void {
    let now = moment();

    this._deltaTime = now.diff(this._lastUpdate, "seconds", true);
    this._time += this._deltaTime;

    this._lastUpdate = now;
  }
}