<template>
  <div class="container page-edit-post">
    <h1 class="title">Редактировать пост</h1>

    <div v-if="postPending" class="loading-state">
      <p>Загрузка данных поста для редактирования...</p>
    </div>

    <div v-else-if="postError" class="error-state">
      <h1 class="error-title">Ошибка загрузки поста</h1>
      <p>Не удалось загрузить данные поста для редактирования. Попробуйте еще раз.</p>
      <button @click="refreshPost" class="button button--primary">Повторить загрузку</button>
      <NuxtLink to="/posts" class="button button--success">← Все посты</NuxtLink>
    </div>

    <div v-else-if="post">
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Заголовок:</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>

        <div class="form-group">
          <label for="image">URL изображения:</label>
          <input type="url" id="image" v-model="form.image" />
          <div v-if="form.image" class="image-preview">
            <img :src="form.image" alt="Предпросмотр изображения" />
          </div>
        </div>

        <div class="form-group">
          <label for="excerpt">Краткое описание:</label>
          <textarea id="excerpt" v-model="form.excerpt" rows="3" required></textarea>
        </div>

        <div class="form-group">
          <label for="content">Содержимое поста (HTML):</label>
          <textarea id="content" v-model="form.content" rows="15" required></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="button button--success" :disabled="isSubmitting">
            {{ isSubmitting ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
          <NuxtLink :to="`/posts/${post.id}`" class="button button--secondary">Отмена</NuxtLink>
        </div>
      </form>
    </div>

    <div v-else class="post-not-found">
      <h1 class="error-title">Пост не найден</h1>
      <p>Кажется, такого поста не существует для редактирования.</p>
      <NuxtLink to="/posts" class="button button--success">Вернуться к постам</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { usePosts } from '~/composables/usePosts';

const route = useRoute();
const router = useRouter();
const { getPostById, updatePost } = usePosts();

const postId = route.params.id;
const isSubmitting = ref(false);

const form = reactive({
  title: '',
  image: '',
  excerpt: '',
  content: '',
  date: ''
});

const {
  data: post,
  pending: postPending,
  error: postError,
  refresh: refreshPost
} = await useAsyncData(`edit-post-${postId}`, () => getPostById(postId));

watch(
  post,
  (newPost) => {
    if (newPost) {
      form.title = newPost.title;
      form.image = newPost.image;
      form.excerpt = newPost.excerpt;
      form.content = newPost.content;
      form.date = newPost.date;
    }
  },
  { immediate: true }
);

const submitPost = async () => {
  isSubmitting.value = true;
  try {
    const updatedData = {
      ...form,
      date: new Date().toISOString()
    };

    await updatePost(postId, updatedData);
    console.log('Пост успешно обновлен!');
    router.push(`/posts/${postId}`);
  } catch (error) {
    console.error('Ошибка при обновлении поста:', error);
    alert('Произошла ошибка при сохранении изменений. Пожалуйста, попробуйте еще раз.');
  } finally {
    isSubmitting.value = false;
  }
};

useHead(() => ({
  title: post.value ? `Редактировать "${post.value.title}"` : 'Редактировать пост...',
  meta: [
    { name: 'description', content: `Редактирование поста: ${post.value ? post.value.title : ''}` }
  ]
}));

if (process.client && post.value === null && !postPending.value && !postError.value) {
  router.replace('/404');
} else if (post.value === null && !postPending.value && !postError.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found', fatal: true });
}
</script>

<style lang="scss" scoped>
.page-edit-post {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;
  max-width: 800px;
  margin: 0 auto;
  padding-left: $spacing-md;
  padding-right: $spacing-md;

  .title {
    font-size: $font-size-h1;
    color: $success-color;
    margin-bottom: $spacing-xl;
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
    input[type='url'],
    textarea {
      width: 100%;
      padding: $spacing-sm;
      border: 1px solid $border-color;
      border-radius: 8px;
      font-size: $font-size-base;
      box-sizing: border-box;
      background-color: $white-color;
      color: $text-color;

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

  .image-preview {
    margin-top: $spacing-sm;
    max-width: 100%;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;
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

      &--success {
        background-color: $success-color;
        color: $white-color;
        &:hover:not(:disabled) {
          background-color: darken($success-color, 10%);
        }
        &:disabled {
          background-color: lighten($success-color, 15%);
          cursor: not-allowed;
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

  .loading-state,
  .error-state,
  .post-not-found {
    text-align: center;
    padding: $spacing-xxl;
    .error-title {
      color: $danger-color;
      font-size: $font-size-h1;
      margin-bottom: $spacing-md;
    }
    p {
      font-size: $font-size-lg;
      margin-bottom: $spacing-xl;
    }
    .button {
      margin: $spacing-md;
    }
  }
}
</style>
