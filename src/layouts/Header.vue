<template>
  <q-header elevated class="bg-primary text-dark" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        <!-- <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
                </q-avatar>-->
        {{ appTitle }}
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab :to="{ name: ROUTE_NAME.MAIN }" label="Pedidos" />
      <q-route-tab :to="{ name: ROUTE_NAME.DISH_LIST }" label="Menu" />
      <q-route-tab :to="{ name: ROUTE_NAME.EVENT_LIST }" label="Eventos" />
      <q-route-tab :to="{ name: ROUTE_NAME.CONFIG }" label="Configuración" />
    </q-tabs>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { appInjectionKey, injectStrict, _config } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
/**
 * AppHeader
 */
export default defineComponent({
  name: 'AppHeader',
  setup() {
    const App = injectStrict(appInjectionKey);
    const Config = injectStrict(_config);
    // Data
    // const address = computed(() => 'Calle Silencio #32, Palmira, Cienfuegos');
    const leftDrawer = computed(() => App.leftDrawer);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const appTitle = computed(() => Config.config.title);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function toggleLeftDrawer() {
      App.toggleLeftDrawer();
    }
    return {
      appTitle,
      leftDrawer,
      ROUTE_NAME,
      toggleLeftDrawer,
    };
  },
});
</script>
