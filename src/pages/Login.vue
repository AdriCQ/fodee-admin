<template>
  <q-page class="row justify-center items-center">
    <q-card style="width: 90%; max-width: 25rem;" bordered>
      <q-card-section>
        <div class="text-h6 text-center text-grey-9">Iniciar</div>
      </q-card-section>
      <q-form class="q-gutter-md" @submit.prevent="onSubmit">
        <q-card-section>
          <!-- <q-input v-model="form.email" type="email" label="Email" /> -->
          <q-input v-model="form.password" type="password" label="Contraseña" />
        </q-card-section>
        <q-card-actions>
          <q-btn
            :loading="loading"
            label="Iniciar"
            class="full-width"
            type="submit"
            text-color="dark"
            color="primary"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { injectStrict, IUserLogin, userInjectionKey } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
import { cryptHash, uiHelper } from 'src/helpers';
import { useQuasar } from 'quasar';
/**
 * AuthLoginPage
 */
export default defineComponent({
  name: 'AuthLoginPage',
  setup() {
    const $user = injectStrict(userInjectionKey);
    const $router = useRouter();
    const $q = useQuasar();
    const { errorHandler } = uiHelper($q, $router);

    const form = ref<IUserLogin>({
      email: '',
      password: ''
    });
    const loading = ref(false);

    function onSubmit() {
      loading.value = true;
      const password = cryptHash(form.value.password);
      console.log(password);
      $user.loginAction({
        email: form.value.email,
        password
      })
        .then(() => {
          void $router.push({ name: ROUTE_NAME.MAIN })
        })
        .catch(_e => { errorHandler(_e, 'No podemos validar sus credenciales') })
        .finally(() => { loading.value = false; })
    }

    return {
      form, loading, onSubmit
    }
  }

});
</script>
