export default class Foe {
  public id: number
  public health: number
  public maxHealth: number
  public type: 'normal'|'elite'
  
  constructor(id: number, health: number, type: 'normal'|'elite') {
    this.id = id
    this.health = health
    this.maxHealth = health
    this.type = type
  }

  suffer(damage: number): Promise<Boolean> {
    this.health -= damage
    return Promise.resolve(this.health <= 0)
  }

  heal(recovery: number): void {
    this.health += recovery
    if (this.health > this.maxHealth) this.health = this.maxHealth
  }
}
