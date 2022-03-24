<template>
    <q-header elevated class="bg-primary text-dark" height-hint="98">
        <q-toolbar>
            <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                <!-- <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
                </q-avatar>-->
                {{ appConfig.name }}
            </q-toolbar-title>
        </q-toolbar>

        <q-tabs align="left">
            <q-route-tab :to="{ name: ROUTE_NAME.MAIN }" label="Pedidos" />
            <q-route-tab :to="{ name: ROUTE_NAME.PRODUCTS }" label="Productos" />
            <q-route-tab :to="{ name: ROUTE_NAME.DESTINATIONS }" label="Destinos" />
        </q-tabs>
    </q-header>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import { appInjectionKey, shopInjectionKey, injectStrict } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
/**
 * AppHeader
 */
export default defineComponent({
    name: 'AppHeader',
    setup() {
        const App = injectStrict(appInjectionKey);
        const $shop = injectStrict(shopInjectionKey);
        // Data
        // const address = computed(() => 'Calle Silencio #32, Palmira, Cienfuegos');
        const leftDrawer = computed(() => App.leftDrawer);
        const appConfig = computed(() => $shop.config)
        /**
         * -----------------------------------------
         *	Methods
         * -----------------------------------------
         */
        function toggleLeftDrawer() { App.toggleLeftDrawer(); }
        return {
            leftDrawer, appConfig, ROUTE_NAME,
            toggleLeftDrawer
        }
    }
});
</script>