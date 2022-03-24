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

<script lang='ts'>
import { defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta, useQuasar } from 'quasar';
import { injectStrict, shopInjectionKey } from 'src/modules';
import AppHeader from './Header.vue';
import LeftDrawer from './LeftDrawer.vue';
import { uiHelper } from 'src/helpers';
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
    const $shop = injectStrict(shopInjectionKey);
    const $router = useRouter();
    const $q = useQuasar();
    const { errorHandler } = uiHelper($q, $router);
    onBeforeMount(() => {
      $shop.getConfig().then(_r => {
        useMeta({
          title: _r.config.name
        });
      }).catch(_e => { errorHandler(_e, 'No hay conexión con el servidor') });
    });
  }
});
</script>