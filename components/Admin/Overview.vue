<script setup lang="ts">
import type { GraphData } from "~/types";
import { VisXYContainer, VisStackedBar, VisAxis } from "@unovis/vue";

defineProps<{
  data: GraphData[];
}>();
</script>

<template>
  <VisXYContainer height="500px" :margin="{ left: 20, right: 20 }" :data="data">
    <VisStackedBar
      :x="(d: GraphData, i: number) => i"
      :y="(d: GraphData) => d.total"
      color="#64748B"
      :rounded-corners="4"
      :bar-padding="0.15"
    />
    <VisAxis
      type="x"
      :num-ticks="data.length"
      :tick-format="(index: number) => data[index]?.name"
      grid-lines="false"
      color="#000"
    />
    <VisAxis
      type="y"
      :num-ticks="data.length"
      :tick-format="(index: number) => data[index]?.name"
      grid-lines="false"
      domain-line="false"
      color="#000"
    />
  </VisXYContainer>
</template>

<style scoped></style>
