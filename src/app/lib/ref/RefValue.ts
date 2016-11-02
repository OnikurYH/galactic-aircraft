// export module RefValue {
//   export function create<T>(value: T): { v: T } {
//     return { v: value };
//   }
// }

export class RefValue<T> {
  public static create<T> (value: T = undefined): RefValue<T> {
    return new RefValue(value);
  }

  public value: T;
  private constructor (value: T) {
    this.value = value;
  }
}