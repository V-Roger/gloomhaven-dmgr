export default class Foe {
  public id: string
  public health: number
  public maxHealth: number
  public rank: 'normal'|'elite'
  public type: string
  public conditions: string[]
  public number: number
  
  constructor(id: string, health: number, rank: 'normal'|'elite', type: string, number: number) {
    this.id = id
    this.health = health
    this.maxHealth = health
    this.rank = rank
    this.type = type
    this.conditions = ['disarmed', 'ablaze']
    this.number = number
  }

  suffer(damage: number): Promise<Boolean> {
    this.health -= damage
    return Promise.resolve(this.health <= 0)
  }

  heal(recovery: number): void {
    this.health += recovery
    if (this.health > this.maxHealth) this.health = this.maxHealth
  }

  endOfTurn(): void {
    if (this.conditions.length === 0) return
    this.conditions = this.conditions.filter(condition => ['poisoned', 'ablaze'].includes(condition))
    this.suffer(this.conditions.length)
  }
}
