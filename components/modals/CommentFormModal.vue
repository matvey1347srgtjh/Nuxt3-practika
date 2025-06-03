<template>
  <div class="comment-form-modal">
    <h3 class="modal-subtitle">Написать комментарий</h3>
    <form @submit.prevent="submitComment">
      <div class="form-group">
        <label for="comment-author">Ваше имя:</label>
        <input type="text" id="comment-author" v-model="author" required />
      </div>
      <div class="form-group">
        <label for="comment-text">Комментарий:</label>
        <textarea id="comment-text" v-model="text" rows="5" required></textarea>
      </div>
      <div class="modal-actions">
        <button type="submit" class="button button--success" :disabled="isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Отправить комментарий' }}
        </button>
        <button type="button" class="button button--secondary" @click="closeModal">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useComments } from '~/composables/useComments';
import { useModalStore } from '@/stores/modal';

const props = defineProps({
  postId: {
    type: String,
    required: true
  },
  onCommentCreated: {
    type: Function,
    required: true
  }
});

const author = ref('');
const text = ref('');
const isSubmitting = ref(false);

const { createComment } = useComments();
const modalStore = useModalStore();

const submitComment = async () => {
  isSubmitting.value = true;
  try {
    const commentData = {
      postId: props.postId,
      author: author.value,
      text: text.value
    };
    await createComment(commentData);
    props.onCommentCreated();
    closeModal();
  } catch (e) {
    console.error('Ошибка при отправке комментария:', e);
    alert('Не удалось отправить комментарий. Пожалуйста, попробуйте еще раз.');
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  modalStore.closeModal();
};
</script>

<style lang="scss" scoped>
.comment-form-modal {
  padding: $spacing-md;
}

.modal-subtitle {
  font-size: $font-size-lg;
  color: $text-color;
  margin-bottom: $spacing-md;
  text-align: center;
}

.form-group {
  margin-bottom: $spacing-md;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: $spacing-xs;
    color: $text-color;
  }

  input[type='text'],
  textarea {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid #a0a8a3;
    border-radius: 8px;
    font-size: $font-size-base;
    box-sizing: border-box;
    background-color: $white-color;
    color: $text-color;

    &:focus {
      outline: none;
      border-color: $success-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
    }
  }

  textarea {
    resize: vertical;
  }
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  gap: $spacing-sm;
  margin-top: $spacing-lg;

  .button {
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-sm;
    height: 3rem;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
