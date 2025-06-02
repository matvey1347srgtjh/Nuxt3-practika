<template>
  <footer class="app-footer">
    <div class="container">
      <NuxtLink to="/" class="app-footer__logo">
        &copy;Тест Блог
      </NuxtLink>
      <nav class="app-footer__nav">
        <ul>
            <p>Просто футер</p>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.app-footer {
  background-color: $success-color; 
  color: $white-color;
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
    color: $white-color;
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

    p {
      color: $white-color;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s ease-in-out;

      
      
    }
  }
}


@media (max-width: 768px) {
  .app-footer {
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