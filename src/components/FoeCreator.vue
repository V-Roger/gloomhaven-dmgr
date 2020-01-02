<template>
  <section class="foe-creator fixed bottom-0 left-0 right-0 bg-gray-900 p-24 flex justify-around">
    <div class="form-group">
      <label for="health" class="text-lg mb-4"><b>{{ health }}</b> PV</label>
      <input type="range" id="health" name="health" min="1" max="20" v-model="health">
    </div>
    <div class="form-group">
      <label for="type" class="text-lg mb-4">Type</label>
      <v-select v-model="type" class="bg-white rounded w-64 text-gray-900" :options="list" label="name"></v-select>
    </div>
    <div class="form-group">
      <label for="number" class="text-lg mb-4">Numéro</label>
      <input v-model="number" type="number" step="1" min="1" max="10" class="px-2 py-1 text-black rounded"/>
    </div>
    <div class="form-group">
      <label for="rank" class="text-lg mb-4">
        <i class="fad fa-crown"/>
      </label>
      <input v-model="isElite" type="checkbox" name="rank" id="rank"/>
    </div>
    <button class="bg-gray-100 hover:bg-gray-500 w-20 h-20 rounded-full" @click="addFoe">
      ➕
    </button>
  </section>
</template>

<script lang="ts">
import uniqid from 'uniqid'
import { Component, Prop, Vue } from 'vue-property-decorator'
import Foe from '@/models/Foe'
import * as foes from '@/assets/foes.json';

@Component
export default class FoeCreator extends Vue {
  private health: number = 10
  private type: {}
  private isElite: boolean = false
  private list: {}[] = foes.types
  private number: number = 1

  constructor() {
    super()
    this.type = this.list[0]
  }

  addFoe(): void {
    this.$emit('createdFoe', new Foe(uniqid(), this.health, this.isElite ? 'elite' : 'normal', this.type, this.number))
  }
}
</script>
<style scoped lang="scss">
  .form-group {
    @apply flex flex-col justify-center items-center content-center;
  }
</style>