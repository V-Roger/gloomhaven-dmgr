<template>
  <section class="damage-manager container mx-auto px-24 flex flex-col flex-no-wrap">
    <header class="w-full mb-16 border-solid border-white border-b-2 flex">
      <button class="btn btn-primary" @click="addFoe">
        +
      </button>
    </header>
    <main class="flex flex-row flex-wrap">
      <damage-tracker v-for="foe in foes" v-bind:key="foe.id" :foe="foe" @death="die(foe)"/>
      <foe-creator v-if="isCreatingFoe" @createdFoe="addedFoe"/>
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
</style>