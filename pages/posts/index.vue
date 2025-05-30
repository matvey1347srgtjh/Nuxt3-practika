<template>
  <div class="container page-posts">
    <h1 class="page-title">Все посты</h1>

    <div class="actions-top">
      <NuxtLink to="/posts/create" class="button button--success-light">Создать новый пост</NuxtLink>
    </div>

    <div v-if="pending" class="loading-state">
      <p>Загрузка всех постов...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>Ошибка загрузки постов: {{ error.message }}</p>
      <button @click="refresh" class="button button--success-light">Повторить загрузку</button>
    </div>
    <div v-else-if="currentPosts && currentPosts.length" class="post-grid">
      <PostCard v-for="post in currentPosts" :key="post.id" :post="post"
        :isLastSingleCard="currentPage === totalPages && currentPosts.length === 1"
      />
    </div>
    <p v-else class="center">Нет доступных постов.</p>

    <div v-if="totalPages > 1 && !pending && !error" class="pagination-controls">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="button pagination-button"
      >
        &larr; </button>

      <button
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        :class="{ 'pagination-button': true, 'active': pageNumber === currentPage }"
        class="button"
      >
        {{ pageNumber }}
      </button>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="button pagination-button"
      >
        &rarr; </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePosts } from '~/composables/usePosts';
import { useRoute, useRouter } from 'vue-router';

const { getAllPosts } = usePosts();
const route = useRoute();
const router = useRouter();

const postsPerPage = 6;
const currentPage = ref(parseInt(route.query.page) || 1);

// Ваш существующий useAsyncData ...
const {
  data: paginatedData,
  pending,
  error,
  refresh
} = await useAsyncData(
  'all-posts-page-paginated',
  () => getAllPosts(currentPage.value, postsPerPage),
  {
    watch: [currentPage],
    debounce: 300,
    transform: (data) => {
        console.log('Данные paginatedData.value после transform:', data);
        return data;
    }
  }
);

const currentPosts = computed(() => {
    const posts = paginatedData.value?.posts || [];
    console.log('currentPosts (computed):', posts.length);
    return posts;
});
const totalPosts = computed(() => {
    const count = paginatedData.value?.totalCount || 0;
    console.log('totalPosts (computed):', count);
    return count;
});

const totalPages = computed(() => {
    const pages = Math.ceil(totalPosts.value / postsPerPage);
    console.log('totalPages (computed):', pages);
    return pages;
});


const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    router.push({ query: { page: page } });
  }
};

watch(() => route.query.page, (newPage) => {
  const pageNum = parseInt(newPage);
  if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages.value && pageNum !== currentPage.value) {
    currentPage.value = pageNum;
  } else if (isNaN(pageNum) || pageNum < 1) {
    currentPage.value = 1;
    router.replace({ query: { page: 1 } });
  }
});

console.log('Состояние v-if для пагинации (финальное):', {
  totalPages: totalPages.value,
  pending: pending.value,
  error: error.value,
  conditionResult: totalPages.value > 1 && !pending.value && !error.value
});

useHead({
  title: 'Все посты - Тест Блог',
  meta: [
    { name: 'description', content: 'Просмотрите полный список всех записей в блоге.' }
  ]
});
</script>

<style lang="scss" scoped>


.center {
  text-align: center;
}
.page-posts {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;

  .page-title {
    color: $success-color;
    font-size: $font-size-h1;
    margin-bottom: $spacing-xxl;
    text-align: center;
  }

  .actions-top {
    text-align: center;
    margin-bottom: $spacing-xl;
  }

  .post-grid {
    display: grid;
    gap: $spacing-xl;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    .post-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .loading-state, .error-state {
    padding: $spacing-md;
    font-size: $font-size-lg;
    color: $text-color-light;
    text-align: center;
  }
  .error-state {
    color: $danger-color;
  }
  .button {
    padding: $spacing-md $spacing-lg;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: $font-size-md;
    transition: background-color 0.2s ease-in-out;
    border: none;
    cursor: pointer;

    &--success-light {
      background-color: $success-light-color;
      color: $white-color;
      &:hover {
        background-color: darken($success-light-color, 10%);
      }
    }

    &.pagination-button {
      background-color: $success-color ;
      color: $white-color;
      &:hover {
        background-color: darken($success-color, 10%);
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }


    &.pagination-button.active {
      background-color: darken($success-color, 15%);
      cursor: default;
    }
  }


  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-md;
    margin-top: $spacing-xxl;
    padding: $spacing-md;
    background-color: transparent;


  }
}
</style>