<template>
  <NuxtLink :to="`/posts/${post.id}`" class="post-card">
    <div class="post-card__image-wrapper">
      <img :src="post.image || 'https://via.placeholder.com/600x400/cccccc/ffffff?text=No+Image'" :alt="post.title" class="post-card__image" loading="lazy">
    </div>
    <div class="post-card__content">
      <h3 class="post-card__title">{{ post.title }}</h3>
      <p class="post-card__date">{{ formatDate(post.date) }}</p>
      <p class="post-card__excerpt">{{ post.excerpt }}</p>
      <span class="post-card__read-more">Читать далее &rarr;</span>
    </div>
  </NuxtLink>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id && value.title && value.date && value.excerpt;
    },
  },
});


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};
</script>

<style lang="scss" scoped>
.post-card {
  display: flex;
  flex-direction: column;
  background-color: $white-color;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-decoration: none;
  color: $text-color;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &__image-wrapper {
    width: 100%;
    padding-top: 66.66%; 
    position: relative;
    overflow: hidden;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
    transition: transform 0.3s ease;
  }

  &:hover &__image {
    transform: scale(1.05);
  }

  &__content {
    padding: $spacing-md;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: $font-size-xl;
    color: $success-color;
    margin-top: 0;
    margin-bottom: $spacing-sm;
    line-height: $line-height-heading;
  }

  &__date {
    font-size: $font-size-sm;
    color: $text-color-light;
    margin-bottom: $spacing-sm;
  }

  &__excerpt {
    font-size: $font-size-base;
    line-height: $line-height-base;
    margin-bottom: $spacing-md;
    flex-grow: 1;
  }

  &__read-more {
    color: $success-light-color;
    font-weight: bold;
    font-size: $font-size-sm;
    margin-top: auto; 
  }
}
</style>