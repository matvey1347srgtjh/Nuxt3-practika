<template>
  <div class="container page-single-post">
    <div v-if="postPending" class="loading-state">
      <p>Загрузка поста...</p>
    </div>

    <div v-else-if="postError" class="error-state">
      <h1 class="error-title">Ошибка загрузки поста</h1>
      <p>Не удалось загрузить данные поста. Попробуйте еще раз.</p>
      <button @click="refreshPost" class="button button--primary">Повторить загрузку</button>
      <NuxtLink to="/posts" class="button button--success">← Все посты</NuxtLink>
    </div>

    <div v-else-if="post">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-date">{{ formatDate(post.date) }}</p>
      <div class="post-image-wrapper">
        <img :src="post.image || 'https://via.placeholder.com/800x600/cccccc/ffffff?text=No+Image'" :alt="post.title" class="post-image">
      </div>
      <div class="post-content" v-html="post.content"></div>
      <div class="post-actions">
        <NuxtLink :to="`/posts/edit/${post.id}`" class="button button--success">Редактировать пост</NuxtLink>
        <NuxtLink to="/posts" class="button button--secondary">← Все посты</NuxtLink>
        <button @click="handleDeletePost" class="button button--danger">Удалить пост</button>
      </div>

      <section class="comments-section">
        <h2>Комментарии</h2>
        <div v-if="commentsPending" class="loading-state">
          <p>Загрузка комментариев...</p>
        </div>
        <div v-else-if="commentsError" class="error-state">
          <p>Не удалось загрузить комментарии. <button @click="refreshComments">Повторить</button></p>
        </div>
        <ul v-else-if="comments && comments.length" class="comments-list">
          <li v-for="comment in comments" :key="comment.id" class="comment-item">
            <p class="comment-author">{{ comment.author }} <span class="comment-date">{{ formatDate(comment.date) }}</span></p>
            <p class="comment-text">{{ comment.text }}</p>
          </li>
        </ul>
        <p v-else class="no-comments">Пока нет комментариев. Будьте первым!</p>
      </section>
    </div>

    <div v-else class="post-not-found">
      <h1 class="error-title">Пост не найден</h1>
      <p>Кажется, такого поста не существует.</p>
      <NuxtLink to="/posts" class="button button--success">Вернуться к постам</NuxtLink>
    </div>

    <ConfirmModal
      ref="confirmModal"
      title="Удалить пост?"
      message="Вы уверены, что хотите безвозвратно удалить этот пост? Это действие нельзя отменить."
      confirm-text="Да, удалить"
      cancel-text="Нет, отмена"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '~/composables/usePosts';
import { useComments } from '~/composables/useComments';
import ConfirmModal from '~/components/ConfirmModal.vue';

const route = useRoute();
const router = useRouter();
const { getPostById, deletePost } = usePosts();
const { getCommentsByPostId } = useComments();

const confirmModal = ref(null);

const { data: post, pending: postPending, error: postError, refresh: refreshPost } = await useAsyncData(
  `post-${route.params.id}`,
  () => getPostById(route.params.id)
);

const { data: comments, pending: commentsPending, error: commentsError, refresh: refreshComments } = await useLazyAsyncData(
  `comments-${route.params.id}`,
  () => getCommentsByPostId(route.params.id),
  { watch: [() => route.params.id] }
);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const handleDeletePost = async () => {
  const confirmed = await confirmModal.value.open();

  if (confirmed) {
    try {
      await deletePost(post.value.id);
      console.log(`Пост с ID ${post.value.id} успешно удален.`);
      router.push('/posts');
    } catch (e) {
      console.error('Ошибка при удалении поста:', e);
      alert('Произошла ошибка при удалении поста. Пожалуйста, попробуйте еще раз.');
    }
  } else {
    console.log('Удаление поста отменено.');
  }
};


useHead(() => ({
  title: post.value ? `${post.value.title} - Тест Блог` : 'Загрузка поста...',
  meta: [
    { name: 'description', content: post.value ? post.value.excerpt : 'Загрузка информации о посте.' }
  ]
}));

if (process.client && post.value === null && !postPending.value && !postError.value) {
  router.replace('/404');
} else if (post.value === null && !postPending.value && !postError.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found', fatal: true });
}
</script>

<style lang="scss" scoped>
.page-single-post {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;

  .button--danger {
    background-color: $danger-color;
    color: $white-color;
    border: none;
    &:hover {
      background-color: darken($danger-color, 10%);
    }
  }

  .post-title {
    font-size: $font-size-h1;
    color: $success-color;
    margin-bottom: $spacing-sm;
    text-align: $center;
  }

  .post-date {
    font-size: $font-size-md;
    color: $text-color-light;
    margin-bottom: $spacing-xl;
    text-align: $center;
  }

  
  .post-image-wrapper {
    width: 100%; 
    margin-bottom: $spacing-xl;
    text-align: $center;

 

  }


  .post-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: block;
    margin-left: auto;
    margin-right: auto;
  }


  .post-actions {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    margin-top: $spacing-xl;
    margin-bottom: $spacing-xxl;

    .button {
      margin-top: 0;
    }

    @media (max-width: 480px) {
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  .post-content {
    font-size: $font-size-base;
    line-height: $line-height-base;
    color: $text-color;
    margin-bottom: $spacing-xxl;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    h2 {
      font-size: $font-size-h2;
      color: $success-color;
      margin-top: $spacing-xl;
      margin-bottom: $spacing-md;
    }
    h3 {
      font-size: $font-size-h3;
      color: $success-color;
      margin-top: $spacing-lg;
      margin-bottom: $spacing-sm;
    }
    p {
      margin-bottom: $spacing-md;
    }
    ul, ol {
      margin-left: $spacing-xl;
      margin-bottom: $spacing-md;
    }
    li {
      margin-bottom: $spacing-sm;
    }
    pre {
      background-color: #f4f4f4;
      padding: $spacing-md;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: $spacing-md;
    }
    code {
      font-family: 'Courier New', Courier, monospace;
      background-color: $background-color;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }

  .button {
    display: inline-block;
    padding: $spacing-md $spacing-lg;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: $font-size-md;
    transition: background-color 0.2s ease-in-out;
    margin-top: $spacing-xl;
    margin-right: $spacing-md;

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

  .post-not-found, .loading-state, .error-state {
    text-align: $center;
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
  }

  .comments-section {
    margin-top: $spacing-xxl;
    padding-top: $spacing-xxl;
    border-top: 1px solid #eee;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;

    h2 {
      font-size: $font-size-h2;
      color: $success-color;
      margin-bottom: $spacing-xl;
      text-align: $center;
    }

    .comments-list {
      list-style: none;
      padding: 0;
    }

    .comment-item {
      background-color: lighten($background-color, 2%);
      border-radius: 8px;
      padding: $spacing-lg;
      margin-bottom: $spacing-md;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .comment-author {
        font-weight: bold;
        color: $text-color;
        margin-bottom: $spacing-xs;
        font-size: $font-size-md;
        .comment-date {
          font-weight: normal;
          color: $text-color-light;
          font-size: $font-size-sm;
          margin-left: $spacing-sm;
        }
      }

      .comment-text {
        font-size: $font-size-base;
        color: $text-color;
        line-height: $line-height-base;
        margin-bottom: 0;
      }
    }

    .no-comments {
      text-align: $center;
      color: $text-color-light;
      font-style: italic;
      padding: $spacing-md;
    }
  }
}
</style>