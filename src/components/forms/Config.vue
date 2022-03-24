<template>
  <q-card class="col-xs-12 col-sm-6">
    <q-card-section>
      <div class="text-h6 text-center">Cambiar Configuración</div>
    </q-card-section>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-card-section class="q-gutter-y-sm">
        <!-- <q-toggle
          v-model="form.open"
          color="green"
          :label="`${form.open ? 'Abierto' : 'Cerrado'}`"
        />-->
        <q-input v-model="form.name" type="text" label="Nombre" />
        <q-input
          v-model="form.description"
          type="textarea"
          label="Descripción"
        />
        <q-input v-model="form.address" type="text" label="Dirección" />
        <!-- <q-input v-model="form.currency" label="Moneda" /> -->
        <q-select
          v-model="form.currency"
          :options="['CUP', 'USD', 'BTC', 'ETH', 'LTC', 'XRP']"
          label="Moneda de Pago"
          filled
        />
        <q-input v-model="form.email" type="email" label="Email" />
        <q-input v-model="form.phone" type="tel" label="Teléfono 1" />
        <q-input v-model="form.phone_extra" type="tel" label="Teléfono 2" />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">Enlaces Redes Sociales</div>
        <q-input v-model="form.social_facebook" label="Facebook" />
        <q-input v-model="form.social_instagram" label="Instagram" />
        <q-input v-model="form.social_youtube" label="Youtube" />
        <q-input v-model="form.social_twitter" label="Twitter" />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">Wallets</div>
        <q-input v-model="form.wallet_type" label="Tipo de Wallet" />
        <q-input v-model="form.wallet" label="Wallet" />
      </q-card-section>
      <q-card-section>
        <q-input v-model="appKey" label="AppKey" readonly />
      </q-card-section>
      <q-card-actions>
        <q-btn
          text-color="dark"
          :loading="loading"
          color="primary"
          type="submit"
          label="Guardar"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeMount } from 'vue';
import { useMeta, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { uiHelper } from 'src/helpers';
import { IConfig, injectStrict, shopInjectionKey } from 'src/modules';
/**
 * ConfigForm
 */
export default defineComponent({
  name: 'ConfigForm',

  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const { errorHandler } = uiHelper($q, $router);
    const $shop = injectStrict(shopInjectionKey);
    onBeforeMount(() => {
      $shop
        .getConfig()
        .then((_r) => {
          form.value = _r.config;
          appKey.value = _r.appKey;
          console.log({ appKey: _r });
        })
        .catch((_e) => {
          errorHandler(_e, 'No se pudo obtener la configuración');
        });
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const appKey = ref('');
    const config = computed(() => $shop.config);
    const form = ref<IConfig>({
      address: '',
      currency: 'CUP',
      email: '',
      name: '',
      open: false,
      phone: '',
      description: '',
      phone_extra: '',
      social_facebook: null,
      social_instagram: null,
      social_twitter: null,
      social_youtube: null,
      wallet: null,
      wallet_type:null
    });
    const loading = ref(false);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function onSubmit() {
      loading.value = true;
      if (form.value.social_facebook === '') form.value.social_facebook = null;
      if (form.value.social_youtube === '') form.value.social_youtube = null;
      if (form.value.social_instagram === '')
        form.value.social_instagram = null;
      if (form.value.social_twitter === '') form.value.social_twitter = null;
      $shop
        .updateConfig(form.value)
        .then((_r) => {
          $q.notify({
            icon: 'mdi-check',
            message: 'Configuración actualizada',
            position: 'center',
            type: 'positive',
            actions: [
              {
                icon: 'mdi-close',
                color: 'white',
                handler: () => {
                  /* ... */
                },
              },
            ],
          });
          useMeta({
            title: _r.name,
          });
        })
        .catch((_e) => {
          console.log(_e);
          errorHandler(_e, 'No se pudo actualizar la configuración');
        })
        .finally(() => {
          loading.value = false;
        });
    }

    return {
      appKey,
      config,
      form,
      loading,
      onSubmit,
    };
  },
});
</script>
