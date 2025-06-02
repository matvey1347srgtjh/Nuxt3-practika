<template>
  <div class="container page-home">
    <h1 class="page-title">Последние посты</h1>

    <div v-if="pending" class="loading-state">
      <p>Загрузка последних постов...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>Ошибка загрузки постов: {{ error.message }}</p>
      <button @click="refresh" class="button button--success">Повторить загрузку</button>
    </div>
    <div v-else-if="latestPosts.length" class="post-grid">
      <PostCard v-for="post in latestPosts" :key="post.id" :post="post" />
    </div>
    <p v-else>Нет доступных постов.</p>

    <div class="all-posts-link-wrapper">
      <NuxtLink to="/posts" class="button button--success">Все посты &rarr;</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { usePosts } from '~/composables/usePosts';
import { computed } from 'vue';

const { getAllPosts } = usePosts();


const { data: allPostsData, pending, error, refresh } = await useAsyncData(
  'all-posts-home',
  () => getAllPosts() 
);


const latestPosts = computed(() => {
  return allPostsData.value?.posts?.slice(0, 3) || [];
});

useHead({
  title: 'Главная страница - Тест Блог',
  meta: [
    { name: 'description', content: 'Добро пожаловать в Тест блог. Последние новости и статьи.' }
  ]
});
</script>

<style lang="scss" scoped>

.page-home {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;
  text-align: center;

  .page-title {
    color: $success-color;
    font-size: $font-size-h1;
    margin-bottom: $spacing-xxl;
  }

  .post-grid {
    display: grid;
    gap: $spacing-xl;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: $spacing-xxl;
  }

  @media (max-width: 768px) {
    .post-grid {
      display: grid;
      gap: $spacing-xl;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      margin-bottom: $spacing-xxl;
    }
  }

  .all-posts-link-wrapper {
    margin-top: $spacing-xl;
  }

  .button {
    display: inline-block;
    padding: $spacing-md $spacing-lg;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: $font-size-md;
    transition: background-color 0.2s ease-in-out;
    margin-top: $spacing-md;

    &--success {
      background-color: $success-color;
      color: $white-color;
      &:hover {
        background-color: darken($success-color, 10%);
      }
    }
  }

  .loading-state, .error-state {
    padding: $spacing-md;
    font-size: $font-size-lg;
    color: $text-color-light;
  }
  .error-state {
    color: $danger-color;
  }
}
</style>