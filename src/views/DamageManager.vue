<template>
  <section class="damage-manager container mx-auto px-24 flex flex-col flex-no-wrap">
    <header class="w-full mb-16 border-solid border-white border-b-2 flex">
      <button class="btn btn-primary" @click="addFoe">
        +
      </button>
    </header>
    <main class="flex flex-row flex-wrap">
      <damage-tracker v-for="foe in foes" v-bind:key="foe.id" :foe="foe" @death="die(foe)"/>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DamageTracker from '@/components/DamageTracker.vue'
import Foe from '@/models/Foe'

@Component({
  components: {
    DamageTracker,
  }
})
export default class DamageManager extends Vue {
  private foes: Foe[] = []

  addFoe() {
    this.foes.push(new Foe(this.foes.length, 3, Math.random() > 0.5 ? 'normal' : 'elite' ))
  }

  die(deadFoe: Foe) {
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