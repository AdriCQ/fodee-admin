<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          icon="mdi-plus"
          class="full-width"
          text-color="dark"
          label="Nuevo Colaborador"
          @click="create"
        />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm justify-center">
          <div class="col-xs-12 col-sm-3" v-for="(user, key) in users" :key="`user-${key}`">
            <user-widget
              class="cursor-pointer"
              :user="user"
              @click="update(Number(user.id), user)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- Dialog -->
    <q-dialog v-model="popup">
      <q-card style="min-width:20rem;">
        <q-form @submit.prevent="onSubmit">
          <q-card-section>
            <div
              class="text-body1 text-center text-grey-9"
            >{{ mode === 'create' ? 'Nuevo' : 'Modificar' }} Colaborador</div>
          </q-card-section>
          <q-card-section class="q-gutter-y-sm">
            <q-input v-model="form.name" type="text" label="Nombre" />
            <q-input v-model="form.email" type="email" label="Email" />
            <q-input v-model="form.phone" type="tel" label="Teléfono" />
            <q-select
              v-model="form.type"
              :options="['RASTREO', 'CONTACTO', 'VENTAS']"
              label="Tipo"
              filled
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              type="submit"
              :loading="loading"
              color="primary"
              text-color="dark"
              :label="`${mode === 'create' ? 'Crear' : 'Modificar'}`"
            />
            <q-btn
              v-if="mode === 'update'"
              :loading="loading"
              color="negative"
              label="Eliminar"
              icon="mdi-delete"
              @click="remove(Number(form.id))"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- / Dialog -->
  </q-page>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { injectStrict, IUserProfile, userInjectionKey } from 'src/modules';
import { uiHelper } from 'src/helpers';
/**
 * UsersPage
 */
export default defineComponent({
  name: 'UsersPage',
  components: {
    'user-widget': defineAsyncComponent(() => import('src/components/widgets/User.vue'))
  },
  setup() {
    const $user = injectStrict(userInjectionKey);
    const $q = useQuasar();
    const $router = useRouter();
    const { errorHandler, deleteDialog } = uiHelper($q, $router);
    onBeforeMount(() => {
      $user.listAction().catch(_e => { errorHandler(_e, 'Error listando usuarios') })
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const form = ref<IUserProfile>({
      email: '',
      name: '',
      phone: '',
      type: 'RASTREO'
    })
    const loading = ref(false);
    const mode = ref<'create' | 'update'>('update');
    const popup = ref(false);
    const users = computed(() => $user.collaborators.filter(_u => _u.id !== 1));
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function create() {
      mode.value = 'create';
      form.value = {
        email: '',
        name: '',
        phone: '',
        type: 'RASTREO'
      };
      popup.value = true
    }

    function remove(_id: number) {
      deleteDialog({
        title: 'Eliminar Colaborador',
        message: '¿Está seguro que desea eliminar el colaborador?',
        onOk: () => {
          loading.value = true;
          $user.deleteAction(_id)
            .catch(_e => {
              errorHandler(_e, 'Error eliminando colaborador')
            }).finally(() => {
              popup.value = false;
              loading.value = false;
            })
        }
      })
    }
    function onSubmit() {
      loading.value = true;
      if (mode.value === 'create') {
        $user.createAction(form.value).then(() => {
          $q.notify({
            type: 'positive',
            message: 'Colaborador creado',
            icon: 'mdi-account-plus',
            position: 'center',
            actions: [
              { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
            ]
          })
        }).catch(_e => {
          errorHandler(_e, 'Error creando colaborador')
        }).finally(() => {
          popup.value = false;
          loading.value = false;

        })
      } else {
        $user.updateAction(Number(form.value.id), form.value).then(() => {
          $q.notify({
            type: 'positive',
            message: 'Colaborador Actualizado',
            icon: 'mdi-account-plus',
            position: 'center',
            actions: [
              { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
            ]
          })
        }).catch(_e => {
          errorHandler(_e, 'Error actualizando colaborador')
        }).finally(() => {
          popup.value = false;
          loading.value = false;

        })
      }
    }

    function update(_id: number, _profile: IUserProfile) {
      mode.value = 'update';
      form.value = _profile;
      popup.value = true
    }

    return {
      form, loading, mode, popup, users,
      // Methods
      create, onSubmit, remove, update
    }
  }
});
</script>