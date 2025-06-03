<template>
  <div class="layout-wrapper">
    <AppHeader />

    <main class="layout-main container">
      <slot />
    </main>

    <AppFooter />

    <AppModal />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import AppModal from '~/components/AppModal.vue';
</script>

<style lang="scss">
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex-grow: 1;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.button {
  display: inline-block;
  padding: $spacing-sm $spacing-md;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &--primary {
    background-color: $primary-color;
    color: $white-color;
    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

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

  &--danger {
    background-color: $danger-color;
    color: $white-color;
    &:hover {
      background-color: darken($danger-color, 10%);
    }
  }
}

.loading-state,
.error-state,
.post-not-found {
  text-align: $center;
  padding: $spacing-xl;

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
</style>
