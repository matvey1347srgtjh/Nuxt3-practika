<template>
  <header class="app-header">
    <div class="container">
      <NuxtLink to="/" class="app-header__logo">
        Тест Блог
      </NuxtLink>
      <nav class="app-header__nav">
        <ul>
          <li>
            <NuxtLink to="/">Главная</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts">Все посты</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts/create">Создать пост</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">О нас</NuxtLink>
          </li>
          
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.app-header {
  background-color: $success-color; 
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 


  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  &__logo {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.5rem;

    &:hover {
      opacity: 0.8;
    }
  }

  &__nav {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1.5rem; 
    }

    li {
      display: inline-block;
    }

    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      display: inline-block;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }

      &.router-link-exact-active {
        transform: scale(1.2);
        font-weight: bold;
      }
    }
  }
}


@media (max-width: 768px) {
  .app-header {
    .container {
      flex-direction: column;
      gap: 1rem;
    }
    &__nav {
      width: 100%;
      ul {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
}
</style>