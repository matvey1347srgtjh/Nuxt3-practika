<template>
  <header class="app-header">
    <div class="container">
      <NuxtLink to="/" class="app-header__logo" @click="closeMenu">
        Тест Блог
      </NuxtLink>

      <button 
        class="app-header__burger" 
        :class="{ 'active': menuOpen }" 
        @click="toggleMenu" 
        aria-label="Открыть/закрыть меню"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        aria-controls="main-navigation-menu"
      >
        <span class="line-top"></span>
        <span class="line-middle"></span>
        <span class="line-bottom"></span>
      </button>

      <nav 
        id="main-navigation-menu"
        class="app-header__nav" 
        :class="{ 'app-header__nav--open': menuOpen }"
        @click.stop="() => {}"
      >
        <ul>
          <li>
            <NuxtLink to="/" @click="closeMenu">Главная</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts" @click="closeMenu">Все посты</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts/create" @click="closeMenu">Создать пост</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" @click="closeMenu">О нас</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; 

const menuOpen = ref(false);
const router = useRouter(); 

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleClickOutside = (event) => {
  const headerElement = document.querySelector('.app-header');
  if (headerElement && !headerElement.contains(event.target)) {
    closeMenu();
  }
};

const closeMenuOnRouteChange = () => {
  closeMenu();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  const removeRouteListener = router.afterEach(closeMenuOnRouteChange);
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    removeRouteListener();
  });
});


</script>

<style lang="scss" scoped>
.app-header {
  background-color: $success-color; 
  color: $white-color;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: relative;
    z-index: 20;
  }

  &__logo {
    color: $white-color;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.5rem;
    z-index: 20;
    
    &:hover {
      opacity: 0.8;
    }
  }


  &__burger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    position: relative; 
    z-index: 20; 
    width: 30px;
    height: 24px;
    
    span {
      display: block;
      width: 100%;
      height: 4px;
      background-color: $white-color;
      transition: all 0.3s ease-in-out;
      border-radius: 2px;
      position: absolute;
      left: 0;
    }

    .line-top {
        top: 0;
    }
    .line-middle {
        top: 50%;
        transform: translateY(-50%);
    }
    .line-bottom {
        bottom: 0;
    }
    

    &.active {
      .line-top {
        transform: translateY(9px) rotate(45deg);
      }
      .line-middle {
        opacity: 0;
      }
      .line-bottom {
        transform: translateY(-11px) rotate(-45deg); 
      }
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
      color: $white-color;
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
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }


    &__burger {
      display: flex;
    }

    &__nav {
      position: absolute;
      top: 100%; 
      left: 0;
      width: 100%;
      background-color: darken($success-color, 5%);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      flex-direction: column;
      align-items: center;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      z-index: 15; 
      
      ul {
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 1rem 0;
        gap: 0;

        li {
          width: 100%;
          text-align: center;
          margin-bottom: 0.5rem;

          &:last-child {
            margin-bottom: 0;
          }
        }

        a {
          padding: 0.75rem 1rem;
          display: block;
          &:hover {
            background-color: darken($success-color, 10%);
          }
        }
      }

      &--open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}
</style>