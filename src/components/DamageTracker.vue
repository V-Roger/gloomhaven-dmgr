<template>
  <div class="damage-tracker p-4 flex flex-col w-1/4">
    <div class="bg-gray-900 rounded-t w-full h-full p-12 flex flex-wrap justify-center">
      <h3 class="w-full flex justify-center">
        {{ foe.id }}
      </h3>
      <b>{{ foe.health }}/{{ foe.maxHealth }}</b>
    </div>
    <footer :class="foe.type === 'elite' ? 'bg-yellow-600' : 'bg-white'" class="flex flew-row p-4 justify-around rounded-b">
      <button class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-900" @click="damage">
        💥
      </button>
      <button class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-900" @click="heal">
        💚
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Foe from '@/models/Foe';

@Component
export default class DamageTracker extends Vue {
  @Prop() private foe!: Foe

  damage() {
    this.foe.suffer(1).then(death => {
      if (death) this.$emit('death')
    })
  }

  heal() {
    this.foe.heal(1)
  }
}
</script>

<style>

</style>