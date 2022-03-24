<template>
  <q-layout view="lHh lpR fFf">
    <app-header />
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- leftDrawer -->
    <left-drawer />
    <!-- / leftDrawer -->
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import AppHeader from './Header.vue';
import LeftDrawer from './LeftDrawer.vue';
/**
 * MainLayout Component
 */
export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    LeftDrawer,
  },
  setup() {
    onBeforeMount(() => {
      // TODO: Load config
    });
  },
});
</script>
