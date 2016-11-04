import { Rect } from "../util";

export class MouseRectListener {
  private _eventElement: JQuery;
  private _rect: Rect;

  public interactive: boolean = true;
  public isHovering: boolean = false;
  public isActiving: boolean = false;

  public onHover: () => void;
  public onMouseDown: () => void;
  public onMouseUp: () => void;

  constructor (eventElement: JQuery, rect: Rect) {
    this._eventElement = eventElement;
    this._rect = rect;

    this._eventElement.on("mouseover", this._handleMouseOver);
    this._eventElement.on("mousedown", this._handleMouseDown);
    this._eventElement.on("mouseup", this._handleMouseUp);
  }

  private _getPositionFromEvent = (event: JQueryEventObject): { x: number, y: number } => {
    let offset: JQueryCoordinates = this._eventElement.offset();
    return {
      x: event.pageX - offset.left,
      y: event.pageY - offset.top
    }
  }

  private _handleMouseOver = (event: JQueryEventObject): void => {
    if (!this.interactive)
      return;

    let { x, y } = this._getPositionFromEvent(event);
    if (this._rect.isInset(x, y)) {
      this.isHovering = true;
      if (this.onHover != null) 
        this.onHover();
    } else {
      this.isHovering = false;
    }
  }

  private _handleMouseDown = (event: JQueryEventObject): void => {
    if (!this.interactive)
      return;

    let { x, y } = this._getPositionFromEvent(event);
    if (this._rect.isInset(x, y)) {
      this.isActiving = true;
      if (this.onMouseDown != null)
        this.onMouseDown();
    }
  }

  private _handleMouseUp = (event: JQueryEventObject): void => {
    if (!this.interactive)
      return;

    let { x, y } = this._getPositionFromEvent(event);
    if (this._rect.isInset(x, y)) {
      this.isActiving = false;
      if (this.onMouseUp != null)
        this.onMouseUp();
    }
  }

  public cleanup (): void {
    this._eventElement.off("mouseover", this._handleMouseOver);
    this._eventElement.off("mousedown", this._handleMouseDown);
    this._eventElement.off("mouseup", this._handleMouseUp);
  }
}