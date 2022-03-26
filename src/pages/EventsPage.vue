<template>
  <q-page padding>
    <q-card class="no-box-shadow text-grey-9">
      <q-card-section class="q-gutter-y-sm q-py-sm">
        <h3 class="text-h4">Eventos</h3>
        <q-btn
          color="positive"
          icon="mdi-plus"
          label="Crear Evento"
          @click="create"
        />
        <div class="row q-col-gutter-sm">
          <div
            class="col-sm-6 col-md-4 col-lg-3"
            v-for="(event, eKey) in events"
            :key="`event-${event.id}-${eKey}`"
          >
            <event-widget
              :event="event"
              @remove="onRemove"
              @click-action="update(event)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="eventModal">
      <event-form
        style="min-width: 25rem"
        :event="updateEvent"
        :mode="formType"
        @created="onCreated"
        @updated="onUpdated"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IEvent, injectStrict, _event } from 'src/modules';
import EventWidget from 'src/components/widgets/EventWidget.vue';
import EventForm from 'src/components/forms/EventForm.vue';
import { notificationHelper } from 'src/helpers';
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
const $event = injectStrict(_event);
void loadEvents();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const events = ref<IEvent[]>([]);
const eventModal = ref(false);
const updateEvent = ref<undefined | IEvent>(undefined);
const formType = ref<'create' | 'update'>('create');

/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

function create() {
  formType.value = 'create';
  updateEvent.value = undefined;
  eventModal.value = true;
}
/**
 * loadEvents
 */
async function loadEvents() {
  try {
    const resp = await $event.list();
    events.value = resp.data;
  } catch (error) {
    notificationHelper.axiosError(error, []);
  }
}
/**
 * onCreated
 * @param e
 */
function onCreated(e: IEvent) {
  events.value.unshift(e);
  notificationHelper.success(['Evento Creado']);
  eventModal.value = false;
  updateEvent.value = undefined;
}
/**
 * onRemove
 * @param id
 */
function onRemove(id: number) {
  const index = events.value.findIndex((_e) => _e.id === id);
  events.value.splice(index, 1);
}
/**
 * onUpdated
 * @param e
 */
function onUpdated(e: IEvent) {
  const index = events.value.findIndex((_e) => _e.id === e.id);
  events.value[index] = e;

  notificationHelper.success(['Evento Actualizado']);
  eventModal.value = false;
  updateEvent.value = undefined;
}
/**
 * update
 * @param event
 */
function update(event: IEvent) {
  formType.value = 'update';
  updateEvent.value = event;
  eventModal.value = true;
}
</script>
