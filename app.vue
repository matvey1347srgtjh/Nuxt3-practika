<template>
  <div id="app-root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Тест Блог` : 'Тест Блог';
  },
  meta: [{ name: 'description', content: 'Система управления постами' }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
      rel: 'stylesheet'
    }
  ]
});
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #f8f8f8;
}

#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 480px) {
  .container {
    max-width: 430px;
  }
}
</style>
