<script setup>
import HeaderSec from '@/components/utils/HeaderSec.vue';
import SideMenu from '@/components/utils/SideMenu.vue';
import ContentSec from '@/components/utils/ContentSec.vue'
</script>

<template>
  <div class="container">
    <HeaderSec class="header" />
    <SideMenu />
    <ContentSec />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-rows: max-content;
  min-height: 100lvh;
}

.header {
  grid-column: 1 / -1;
}
</style>
