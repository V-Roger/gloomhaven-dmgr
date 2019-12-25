<template>
  <section class="damage-manager container mx-auto px-24 flex flex-col flex-no-wrap">
    <header class="mx-auto mb-16 px-8 flex justify-center bg-gray-800 rounded-full shadow">
      <button class="btn" @click="addFoe">
        <i class="text-4xl hover:text-gray-400 fad fa-plus-square"/>
      </button>
      <button class="btn" @click="endOfTurn">
        <i class="text-4xl hover:text-gray-400 fad fa-sync-alt"/>
      </button>
      <button class="btn">
        <i class="text-4xl hover:text-gray-400 fad fa-chart-pie"/>
      </button>
    </header>
    <main class="flex flex-row flex-wrap">
      <damage-tracker v-for="foe in foes" v-bind:key="foe.id" :foe="foe" @death="die(foe)"/>
      <transition name="slideUp">
        <foe-creator class="absolute z-10" v-if="isCreatingFoe" @createdFoe="addedFoe"/>
      </transition>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DamageTracker from '@/components/DamageTracker.vue'
import FoeCreator from '@/components/FoeCreator.vue'
import Foe from '@/models/Foe'

@Component({
  components: {
    DamageTracker,
    FoeCreator,
  },
})
export default class DamageManager extends Vue {
  private foes: Foe[] = []
  private isCreatingFoe = false

  addFoe(): void {
    this.isCreatingFoe = true
  }

  addedFoe(foe: Foe): void {
    this.foes.push(foe)
    this.isCreatingFoe = false
  }

  die(deadFoe: Foe): void {
    const idx = this.foes.findIndex(foe => deadFoe.id === foe.id);
    this.foes.splice(idx, 1)
  }

  endOfTurn(): void {
    this.foes.forEach(foe => foe.endOfTurn())
  }
}
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-primary {
    @apply bg-gray-800 text-white;
  }

  .btn-primary:hover {
    @apply bg-gray-900;
  }

  .slideUp-enter-active, .slideUp-leave-active {
    transition: bottom 120ms ease-in;
    bottom: 0;
  }
  
  .slideUp-enter, .slideUp-leave-to /* .fade-leave-active below version 2.1.8 */ {
    bottom: -200px;
  }
</style>