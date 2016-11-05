import { TextAlign } from ".";

export interface UIElementOptions {
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  fontFace?: string;
  textAlign?: TextAlign;
}

export function getUIElementOptionsDefaults (opts: UIElementOptions = {}): UIElementOptions {
  let defaults = {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#FFF",
    fontSize: 12,
    fontFace: "Arial",
    textAlign: TextAlign.Left
  };

  return Object.assign({}, defaults, opts);
}