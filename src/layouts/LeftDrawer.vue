<template>
  <q-drawer
    :model-value="sidebarOpen"
    @update:model-value="updateSidebarOpen"
    show-if-above
    side="left"
    :width="280"
  >
    <!-- profile -->
    <div class="text-center q-mt-md">
      <div class="text-grey-9 text-body1">Hola, {{ userProfile.name }}</div>
    </div>
    <!-- / profile -->

    <!-- list -->
    <div class="q-gutter-sm q-mt-md">
      <q-list class="rounded-borders" style="max-width: 350px">
        <!-- Mis Pedidos -->
        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-cart-outline" color="primary" text-color="dark" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Pedidos</q-item-label>
          </q-item-section>
        </q-item>
        <!-- / Mis Pedidos -->
        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.PRODUCTS }">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-cube" color="primary" text-color="dark" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Productos</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Mis Marcadores -->
        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.DESTINATIONS }">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-map-marker-outline" color="primary" text-color="dark" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Destinos</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Profile -->
        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.USERS }">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-account-multiple" color="primary" text-color="dark" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Colaboradores</q-item-label>
          </q-item-section>
        </q-item>
        <!-- / Profile -->

        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.CONFIG }">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-wrench" color="primary" text-color="dark" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Ajustes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-exit-to-app" color="primary" text-color="dark" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- / list -->
  </q-drawer>
</template>

<script lang='ts'>
import { appInjectionKey, userInjectionKey, injectStrict } from 'src/modules';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAME } from 'src/router';
/**
 * ClientDrawer
 */
export default defineComponent({
  name: 'LeftDrawer',
  setup() {
    // Init Store
    const App = injectStrict(appInjectionKey);
    const $user = injectStrict(userInjectionKey);
    const $router = useRouter();
    // const User = injectStrict(userInjectionKey);
    // Data
    const userProfile = computed(() => $user.profile);
    const sidebarOpen = computed(() => App.leftDrawer);
    // const userName = computed(() => User.profile.name);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * updateSidebarOpen
     */
    function updateSidebarOpen(_open: boolean) { App.leftDrawer = _open }
    function logout() {
      $user.logout();
      void $router.push({ name: ROUTE_NAME.LOGIN })
    }

    return {
      // Data
      sidebarOpen, ROUTE_NAME, userProfile,
      // Methods
      updateSidebarOpen, logout
    }
  },
});
</script>