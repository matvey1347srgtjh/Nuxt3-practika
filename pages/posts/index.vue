<template>
  <div class="container page-posts">
    <h1 class="page-title">Все посты</h1>

    <div v-if="allPosts.length" class="post-grid">
      <PostCard v-for="post in allPosts" :key="post.id" :post="post" />
    </div>
    <p v-else>Нет доступных постов.</p>
  </div>
</template>

<script setup>
import { usePosts } from '~/composables/usePosts'; 


const { getAllPosts } = usePosts();
const allPosts = getAllPosts();


useHead({
  title: 'Все посты - Тест Блог',
  meta: [
    { name: 'description', content: 'Просмотрите полный список всех записей в блоге.' }
  ]
});
</script>

<style lang="scss" scoped>
.page-posts {
  padding-top: $spacing-xl;
  padding-bottom: $spacing-xl;

  .page-title {
    color: $success-color;
    font-size: $font-size-h1;
    margin-bottom: $spacing-xxl;
    text-align: center;
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
    
  
}
</style>