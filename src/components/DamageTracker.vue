<template>
  <div class="damage-tracker p-4 flex flex-col w-1/4">
    <div class="foe-card rounded-t w-full h-full p-24 flex flex-wrap">
      <img :src="`./img/foes/${foe.type.id}.jpg`" class="foe-img rounded-t"/>
      <p class="number text-2xl font-bold bg-gray-900 w-12 h-12 rounded-full text-center font-sans">
        {{ foe.number }}
      </p>
      <h3 class="w-full flex justify-center text-lg font-bold">
        {{ foe.type.name }}
      </h3>
      <ul class="conditions">
        <li v-for="condition in foe.conditions" v-bind:key="condition">
          <i class="fad text-2xl font-bold bg-gray-900 w-12 h-12 rounded-full text-center pt-3 mt-2" :class="conditionClass(condition)" />
        </li>
      </ul>
      <b class="health font-mono">{{ foe.health }}/{{ foe.maxHealth }}</b>
    </div>
    <div class="healthbar w-full h-4 bg-black">
      <div class="healthbar-gauge" :style="{ width: foe.health / foe.maxHealth * 100 + '%' }"></div>
    </div>
    <footer :class="footerClass" class="flex flew-row flex-wrap p-4 px-2 justify-around rounded-b">
      <button class="rounded-full h-16 w-16 text-3xl flex items-center justify-center bg-gray-900" @click="damage">
        <i class="fad fa-claw-marks text-red-500"/>
      </button>
      <button class="rounded-full h-16 w-16 text-3xl flex items-center justify-center bg-gray-900" @click="heal">
        <i class="fad fa-heart text-green-500"/>
      </button>
      <button class="rounded-full h-16 w-16 text-3xl flex items-center justify-center bg-gray-900" @click="isAddingCondition = !isAddingCondition">
        <i class="fad fa-star-christmas text-yellow-500"/>
      </button>
      <ul v-if="isAddingCondition" class="condition-switcher z-10 w-full flex flex-row flex-wrap justify-center">
        <li v-for="condition in conditions" v-bind:key="condition" class="p-2">
          <i class="fad text-2xl font-bold bg-gray-900 w-12 h-12 rounded-full text-center pt-3 mt-2 hover:bg-red-900" :class="conditionClass(condition)" @click="addCondition(condition)"/>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Foe from '@/models/Foe';
import * as conditionsList from '@/assets/conditions.json'

@Component
export default class DamageTracker extends Vue {
  @Prop() private foe!: Foe
  private isAddingCondition: boolean = false
  private conditions: string[] = conditionsList.conditions

  damage() {
    this.foe.suffer(1).then(death => {
      if (death) this.$emit('death')
    })
  }

  heal() {
    this.foe.heal(1)
  }

  addCondition(condition: string) {
    this.foe.addCondition(condition)
    this.isAddingCondition = false
  }

  get footerClass (): string {
    let className = this.foe.rank === 'elite' ? 'bg-yellow-600' : 'bg-white'
    if (this.isAddingCondition) {
      className = `${className} full-height`
    }
    return className
  }

  conditionClass(condition: string) {
    switch(condition) {
      case 'poisoned':
        return 'fa-flask-poison'
      case 'muddled':
        return 'fa-question'
      case 'immobilized':
        return 'fa-bone-break'
      case 'disarmed':
        return 'fa-swords'
      case 'stunned':
        return 'fa-sun'
      case 'ablaze':
        return 'fa-fire-alt'
    }
  }
}
</script>

<style scoped lang="scss">
.damage-tracker  {
  position: relative;
  z-index: 1;

  .healthbar-gauge {
    height: 100%;
    background: #de3618;
    transition: width 60ms ease-in;
  }

  .foe-card {
    position: relative;

    & .number {
      position: absolute;
      top: 8px;
      right: 8px;
      padding-top: 6px;
    }

    & .conditions {
      position: absolute;
      bottom: 8px;
      left: 8px;
    }

    & .health {
      position: absolute;
      bottom: 4px;
      right: 8px;
    }
  }

  .foe-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  footer {
    &.full-height {
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      bottom: 1rem;
    }
  }
}
</style>