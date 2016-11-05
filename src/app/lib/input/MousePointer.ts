import * as $ from "jquery";

import { Point } from "../util";

export module MousePointer {
  let _listenElement: JQuery;
  let _listenElementParent: JQuery;

  export let position: Point = new Point();

  function _updateMousePositionEvent (event: JQueryEventObject) {
    let pOffset: JQueryCoordinates = _listenElementParent.offset();
    position.x = event.pageX - pOffset.left;
    position.y = event.pageY - pOffset.top;
  }

  export function initWithListenElement (listenElement: JQuery) {
    cleanup();

    _listenElement = listenElement;
    _listenElement.on("mousemove", _updateMousePositionEvent);
    _listenElement.on("mouseenter", _updateMousePositionEvent);
    _listenElementParent = _listenElement.parent();
  }

  export function cleanup () {
    if (_listenElement != null) {
      _listenElement.off();
    }

    _listenElement = undefined;
    _listenElementParent = undefined;
  }
}