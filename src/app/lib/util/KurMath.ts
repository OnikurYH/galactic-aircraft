export module KurMath {
  export function lerp (start: number, end: number, amt: number): number {
    return (1-amt)*start+amt*end
  }

  export function clamp (value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  export function randomRange (min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  export function moveToward (value: number, to: number, speed: number): number {
    let cSpeed = Math.ceil(speed);
    let result = value;
    if (value > to) {
      result -= Math.floor(speed);
      if (result < to)
        result = to;
    } else if (value < to) {
      result += Math.ceil(speed);
      if (result > to)
        result = to;
    }

    return result;
  }
}