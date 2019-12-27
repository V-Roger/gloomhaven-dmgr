export default class Foe {
  public id: string
  public health: number
  public maxHealth: number
  public rank: 'normal'|'elite'
  public type: {}
  public conditions: string[]
  public number: number
  
  constructor(id: string, health: number, rank: 'normal'|'elite', type: {}, number: number) {
    this.id = id
    this.health = health
    this.maxHealth = health
    this.rank = rank
    this.type = type
    this.conditions = []
    this.number = number
  }

  suffer(damage: number): Promise<Boolean> {
    this.health -= damage
    return Promise.resolve(this.health <= 0)
  }

  heal(recovery: number): void {
    const healableConditions = this.conditions.filter(condition => ['poisoned', 'ablaze'].includes(condition))
    if (healableConditions.length) {
      this.conditions.splice(this.conditions.indexOf(healableConditions[0]), 1)
    } else {
      this.health += recovery
      if (this.health > this.maxHealth) this.health = this.maxHealth
    }
  }

  endOfTurn(): void {
    if (this.conditions.length === 0) return
    this.conditions = this.conditions.filter(condition => ['poisoned', 'ablaze'].includes(condition))
    this.suffer(this.conditions.length)
  }

  addCondition(condition: string): void {
    this.conditions.push(condition)
  }
}
