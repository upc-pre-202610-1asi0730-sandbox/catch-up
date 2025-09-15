<script setup lang="js">
  import {computed} from "vue";
  const languages = computed(() => $i18n.availableLocales());
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="languages" />
</template>

<style scoped>

</style>