<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-center">Cambiar Contraseña</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.current_password" type="password" label="Contraseña Actual" />
        <q-input v-model="form.password" type="password" label="Nueva Contraseña" />
        <q-input v-model="form.password_confirmation" type="password" label="Repetir Contraseña" />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" text-color="dark" icon="mdi-lock" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang='ts'>
import { IUpdatePassword } from 'src/modules';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { injectStrict, userInjectionKey } from 'src/modules';
import { cryptHash, uiHelper } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
/**
 * ChangePasswordForm
 */
export default defineComponent({
  name: 'ChangePasswordForm',
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const { errorHandler } = uiHelper($q, $router);
    const $user = injectStrict(userInjectionKey);

    const form = ref<IUpdatePassword>({
      password: '',
      current_password: '',
      password_confirmation: ''
    });

    function onSubmit() {
      $user.updatePasswordAction({
        current_password: cryptHash(form.value.current_password),
        password: cryptHash(form.value.password),
        password_confirmation: cryptHash(form.value.password_confirmation),
      }).then(() => {
        $q.notify({
          type: 'positive',
          message: 'Contraseña modificada',
          position: 'center',
          actions: [{ label: 'x', color: 'white', handler: () => {/* Handle */ } }]
        })
        void $router.push({ name: ROUTE_NAME.LOGIN });
      }).catch(_e => { errorHandler(_e, 'Error actualizando contraseña') });
    }

    return {
      form, onSubmit
    }
  }
});
</script>