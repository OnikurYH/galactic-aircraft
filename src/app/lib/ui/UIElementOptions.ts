export interface UIElementOptions {
  backgroundColor: string;
  color: string;
  fontSize: number;
  fontFace: string;
}

export function getUIElementOptionsDefaults (): UIElementOptions {
  return {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#FFF",
    fontSize: 12,
    fontFace: "Arial"
  };
}