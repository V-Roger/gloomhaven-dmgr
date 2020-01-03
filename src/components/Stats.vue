<template>
  <section class="stats fixed bg-gray-900 rounded shadow flex flex-row flex-wrap">
    <svg class="chart damage-chart"/>
  </section>
</template>

<script lang="ts">
import d3 from 'd3'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Stats extends Vue {
  private generateChart(data): void {
    const svg = d3.select('.damage-chart')
    const svgClientSize = svg.node().getBoundingClientRect()
    const xScale = d3.scaleLinear()
      .domain([0, svgClientSize.width])
      .range([0, data.max])
  }

  created() {
    this.generateChart()
  }
}
</script>

<style lang="scss" scoped>
  .stats {
    left: 40px;
    right: 40px;
    bottom: 40px;
    top: 16px;
  }
</style>