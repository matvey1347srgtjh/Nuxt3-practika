<template>
  <div class="container page-create-post">
    <h1 class="page-title">Создать новый пост</h1>

    <form @submit.prevent="createPostHandler" class="post-form">
      <div class="form-group">
        <label for="title">Заголовок поста:</label>
        <input type="text" id="title" v-model="post.title" required>
      </div>

      <div class="form-group">
        <label for="excerpt">Краткое описание (анонс):</label>
        <textarea id="excerpt" v-model="post.excerpt" rows="3" required></textarea>
      </div>

      <div class="form-group">
        <label for="content">Содержимое поста (HTML):</label>
        <textarea id="content" v-model="post.content" rows="10" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">URL изображения:</label>
        <input type="url" id="image" v-model="post.image">
      </div>

      <div class="form-actions">
        <button type="submit" class="button button--success" :disabled="creatingPost">
          {{ creatingPost ? 'Создание...' : 'Создать пост' }}
        </button>
        <NuxtLink to="/posts" class="button button--secondary">Отмена</NuxtLink>
      </div>

      <p v-if="createError" class="error-message">
        Ошибка при создании поста: {{ createError.message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePosts } from '~/composables/usePosts';
import { useRouter } from 'vue-router';

const { createPost } = usePosts();
const router = useRouter();


const post = ref({
  title: '',
  excerpt: '',
  content: '',
  image: '',
  date: new Date().toISOString().split('T')[0]
});


const creatingPost = ref(false);
const createError = ref(null);

const createPostHandler = async () => {
  creatingPost.value = true;
  createError.value = null;

  try {
    const newPost = await createPost(post.value);
    console.log('Пост успешно создан:', newPost);
 
    await router.push(`/posts/${newPost.id}`);

  } catch (e) {
    console.error('Ошибка при создании поста:', e);
    createError.value = e;
  } finally {
    creatingPost.value = false;
  }
};


useHead({
  title: 'Создать новый пост - Тест Блог',
  meta: [
    { name: 'description', content: 'Страница для создания новой записи в блоге.' }
  ]
});
</script>

<style lang="scss" scoped>
.page-create-post {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  .page-title {
    font-size: $font-size-h1;
    color: $success-color;
    margin-bottom: $spacing-xxl;
    text-align: $center;
  }

  .post-form {
    background-color: $white-color;
    padding: $spacing-xxl;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .form-group {
      margin-bottom: $spacing-lg;

      label {
        display: block;
        font-weight: bold;
        margin-bottom: $spacing-sm;
        color: $text-color;
      }

      input[type="text"],
      input[type="url"],
      textarea {
        width: 100%;
        padding: $spacing-md;
        border: 1px solid $secondary-color;
        border-radius: 8px;
        font-size: $font-size-base;
        font-family: $font-stack;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: $success-color;
          box-shadow: 0 0 0 2px rgba($success-color, 0.2);
        }
      }

      textarea {
        resize: vertical;
      }
    }

    .form-actions {
      display: flex;
      gap: $spacing-md;
      justify-content: flex-end;
      margin-top: $spacing-xl;
      
      .button {
        padding: $spacing-md $spacing-lg;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: $font-size-md;
        transition: background-color 0.2s ease-in-out;
        border: none;
        cursor: pointer;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &--success {
          background-color: $success-color;
          color: $white-color;
          &:hover {
            background-color: darken($success-color, 10%);
          }
        }
        &--secondary {
          background-color: $secondary-color; 
          color: $white-color;
          &:hover {
            background-color: darken($secondary-color, 10%);
          }
        }
      }
    }

    .error-message {
      color: $danger-color;
      margin-top: $spacing-md;
      text-align: $center;
      font-weight: 500;
    }
  }
}
</style>