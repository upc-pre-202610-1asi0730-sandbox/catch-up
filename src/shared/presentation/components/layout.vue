<script setup lang="js">
import {computed, onMounted, onUpdated, ref} from "vue";
  import {newsStore} from "../../../news/application/news.store.js";
  import SourceList from "../../../news/presentation/components/source-list.vue";
  import LanguageSwitcher from "./language-switcher.vue";
  import ArticleList from "../../../news/presentation/components/article-list.vue";
  import UnavailableContent from "../../../news/presentation/components/unavailable-content.vue";
  import FooterContent from "./footer-content.vue";

  const drawerVisible = ref(false);

  const toggleDrawer = () => {
    drawerVisible.value = !drawerVisible.value;
  };

  const articles = computed(() => newsStore.articles);
  const sources = computed(() => newsStore.sources);
  const errors = computed(() => newsStore.errors);

  function setSource(source) {
    console.log("Selected source:", source);
    newsStore.setCurrentSource(source);
    toggleDrawer();
  };

  onMounted(() => {
    newsStore.loadSources();
    console.log(errors);
  });

</script>

<template>
  <div>
    <div>
      <pv-menubar>
        <template #start>
          <pv-button icon="pi pi-bars" label="CatchUp"
                     text @click="toggleDrawer"/>
          <source-list v-model:visible="drawerVisible"
                       v-model:sources="sources"
                       v-on:source-selected="setSource($event)"/>
        </template>
        <template #end>
          <language-switcher></language-switcher>
        </template>
      </pv-menubar>
    </div>
  </div>
  <div>
    <article-list v-if="articles" :articles="articles"></article-list>
    <unavailable-content v-else :errors="errors"></unavailable-content>
  </div>
  <footer-content></footer-content>
</template>

<style scoped>

</style>