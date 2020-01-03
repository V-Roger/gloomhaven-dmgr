<template>
  <section class="damage-manager container mx-auto px-24 flex flex-col flex-no-wrap">
    <aside class="current-lvl fixed">
      <i class="lvl-control hover:text-red-500 absolute fad fa-minus-circle" @click="reduceCurrentLvl"/>
      <i class="absolute fad fa-trophy"/>
      <h3 class="font-mono text-black font-bold">{{ currentLvl }}</h3>
      <i class="lvl-control hover:text-red-500 absolute fad fa-plus-circle" @click="increaseCurrentLvl"/>
    </aside>
    <aside class="turn-counter fixed">
      <i class="absolute fad fa-certificate"/>
      <h3 class="font-mono text-black font-bold">{{ currentTurn }}</h3>
    </aside>
    <header class="mx-auto mb-16 px-8 flex justify-center bg-gray-800 rounded-full shadow">
      <button class="btn" @click="addFoe">
        <i class="text-4xl hover:text-gray-400 fad fa-plus-square"/>
      </button>
      <button class="btn" @click="endOfTurn">
        <i class="text-4xl hover:text-gray-400 fad fa-sync-alt"/>
      </button>
      <button class="btn" @click="showStats">
        <i class="text-4xl hover:text-gray-400 fad fa-chart-pie"/>
      </button>
    </header>
    <main class="flex flex-row flex-wrap">
      <transition-group class="w-full flex flex-row flex-wrap" name="fadeInUp" tag="div">
        <damage-tracker v-for="foe in foes" v-bind:key="foe.id" :foe="foe" @death="die(foe)"/>
      </transition-group>
      <transition name="slideUp">
        <foe-creator class="fixed z-10" v-if="isCreatingFoe" :lvl="currentLvl" @createdFoe="addedFoe"/>
      </transition>
      <transition name="fadeInUp">
        <Stats v-if="isShowingStats" />
      </transition>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DamageTracker from '@/components/DamageTracker.vue'
import FoeCreator from '@/components/FoeCreator.vue'
import Stats from '@/components/Stats.vue'
import Foe from '@/models/Foe'

@Component({
  components: {
    DamageTracker,
    FoeCreator,
    Stats,
  },
})
export default class DamageManager extends Vue {
  private foes: Foe[] = []
  private isCreatingFoe = false
  private currentTurn: number = 1
  private currentLvl: number = 1
  private isShowingStats = false

  addFoe(): void {
    this.isCreatingFoe = true
  }

  addedFoe(foe: Foe): void {
    this.foes.push(foe)
    this.isCreatingFoe = false
    this.$store.commit('addFoe', foe)
  }

  die(deadFoe: Foe): void {
    const idx = this.foes.findIndex(foe => deadFoe.id === foe.id);
    this.foes.splice(idx, 1)
    this.$store.commit('killFoe')
  }

  endOfTurn(): void {
    this.foes.forEach(foe => {
      foe.endOfTurn()
      if (foe.health <= 0) this.die(foe)
    })
    this.currentTurn++
  }

  reduceCurrentLvl(): void {
    this.currentLvl--
    if (this.currentLvl < 1) this.currentLvl = 1
  }

  increaseCurrentLvl(): void {
    this.currentLvl++
  }

  showStats(): void {
    this.isShowingStats = true
  }
}
</script>

<style lang="scss">
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

  .fadeInUp-enter-active, .fadeInUp-leave-active {
    transition: all 80ms ease-in;
    transform: translateY(0);
    opacity: 1;
  }
  
  .fadeInUp-enter, .fadeInUp-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(50px);
    opacity: 0;
  }

  .current-lvl {
    width: 12rem;
    text-align: center;
    top: 5.6rem;
    left: 4rem;

    & i {
      font-size: 10rem;
    
      &.lvl-control {
        top: 2rem;
        font-size: 4rem;

        &:first-of-type {
          left: 0;
        }

        &:last-of-type {
          right: -11rem;
        }
      }
    }

    & h3 {
      position: relative;
      font-size: 4rem;
      left: 5.6rem;
      top: 1rem;
    }
  }

  .turn-counter {
    width: 12rem;
    text-align: center;
    top: 4rem;
    right: 12rem;

    & i {
      font-size: 12rem;
    }

    & h3 {
      position: relative;
      font-size: 4rem;
      left: 6rem;
      top: 3.4rem;
    }
  }
</style>