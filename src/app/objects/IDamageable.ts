export interface IDamageable {
  hit(source: any, damage: number): boolean;
}