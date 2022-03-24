<template>
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import {
  appInjectionKey,
  appStore,
  userInjectionKey,
  userStore,
  $event,
  _event,
  _config,
  $configInjectable,
  _dish,
  $dishInjectable,
} from 'src/modules';
/**
 * App
 */
export default defineComponent({
  name: 'App',
  setup() {
    provide(appInjectionKey, appStore);
    provide(_config, $configInjectable);
    provide(userInjectionKey, userStore);
    provide(_event, $event);
    provide(_dish, $dishInjectable);
  },
});
</script>
