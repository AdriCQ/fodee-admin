<template>
  <q-layout view="lHh LpR fFf">
    <app-header />
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- leftDrawer -->
    <left-drawer />
    <!-- / leftDrawer -->
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from './Header.vue';
import LeftDrawer from './LeftDrawer.vue';
import { injectStrict, _config } from 'src/modules';
import { notificationHelper } from 'src/helpers';

/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
const $config = injectStrict(_config);
$config.load().catch((_e) => notificationHelper.axiosError(_e, []));
</script>
