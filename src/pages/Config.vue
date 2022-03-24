<template>
  <q-page padding>
    <q-card class="text-grey-9">
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-6">
          <config-form />
        </div>
        <div class="col-xs-12 col-sm-6">
          <change-password-form />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent } from 'vue';
/**
 * ConfigPage
 */
export default defineComponent({
  name: 'ConfigPage',
  components: {
    'config-form': defineAsyncComponent(() => import('src/components/forms/Config.vue')),
    'change-password-form': defineAsyncComponent(() => import('src/components/forms/ChangePassword.vue'))
  },
});
</script>