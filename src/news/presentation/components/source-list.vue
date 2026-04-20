<script setup lang="js">
  import {Source} from "../../domain/model/source.entity.js";
  import SourceItem from "./source-item.vue";
  import {toRefs} from "vue";

  const props = defineProps({ visible: Boolean, sources: Array[Source] });
  const emit  = defineEmits(['source-selected']);

  function emitSourceSelectedEvent(source) {
    emit('source-selected', source);
  }

  const { visible, sources } = toRefs(props);
</script>

<template>
  <pv-drawer v-bind:visible="visible">
    <source-item v-for="source in sources"
                 :key="source.id"
                 :source="source"
                 @source-selected="emitSourceSelectedEvent(source)"/>
  </pv-drawer>
</template>

<style scoped>

</style>