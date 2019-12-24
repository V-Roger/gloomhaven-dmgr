<template>
  <section class="foe-creator fixed bottom-0 left-0 right-0 bg-gray-900 p-24">
    <input type="range" id="health" name="health" min="1" max="20" v-model="health">
    <label for="health">{{ health }}</label>
    <button @click="addFoe">
      ➕
    </button>
  </section>
</template>

<script lang="ts">
import uniqid from 'uniqid'
import { Component, Prop, Vue } from 'vue-property-decorator'
import Foe from '@/models/Foe'

@Component
export default class FoeCreator extends Vue {
  private health: number = 10

  addFoe(): void {
    this.$emit('createdFoe', new Foe(uniqid(), this.health, 'elite'))
  }
}
</script>
<style>

</style>