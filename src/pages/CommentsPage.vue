<template>
  <q-page padding>
    <q-card class="no-shadow-box text-grey-9">
      <q-card-section class="q-gutter-y-sm">
        <div class="text-h6">Comentarios</div>
        <q-btn
          color="positive"
          icon="mdi-plus"
          @click="popup = true"
          label="Nuevo Comentario"
        />
        <div class="row q-col-gutter-sm">
          <div
            class="col-sm-6 col-md-4 col-lg-3"
            v-for="(comment, key) in comments"
            :key="`comment-${comment.id}-${key}`"
          >
            <comment-widget
              :comment="comment"
              @comment-removed="onCommentRemoved(key)"
              @comment-updated="onCommentUpdated"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="popup">
      <comment-form
        style="min-width: 25rem"
        @create-comment="onCommentCreated"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import CommentWidget from 'src/components/widgets/CommentWidget.vue';
import CommentForm from 'src/components/forms/CommentForm.vue';
import { ref } from 'vue';
import { IComment, injectStrict, _comment } from 'src/modules';
import { notificationHelper } from 'src/helpers';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $comment = injectStrict(_comment);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const comments = ref<IComment[]>([]);
const popup = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
async function listComments() {
  notificationHelper.loading();
  try {
    const resp = await $comment.list();
    comments.value = resp.data;
  } catch (error) {
    notificationHelper.axiosError(error, ['No se pudo cargar los comentarios']);
  }
  notificationHelper.loading(false);
}

function onCommentCreated(com: IComment) {
  comments.value.unshift(com);
  popup.value = false;
}

function onCommentRemoved(key: number) {
  comments.value.splice(key, 1);
}

function onCommentUpdated(c: IComment) {
  const index = comments.value.findIndex((_c) => _c.id === c.id);
  comments.value[index] = c;
}

/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
void listComments();
</script>
