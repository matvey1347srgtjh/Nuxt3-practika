<template>
  <ClientOnly>
    <teleport to="body">
      <Transition name="modal-fade">
        <div v-if="modalStore.isOpen" class="app-modal-overlay" @click.self="modalStore.closeModal">
          <div class="app-modal-content">
            <div class="app-modal-header" v-if="modalStore.title">
              <h2>{{ modalStore.title }}</h2>
              <button class="app-modal-close" @click="modalStore.closeModal">&times;</button>
            </div>
            <div class="app-modal-body">
              <component
                :is="modalStore.component"
                v-bind="modalStore.props"
                @close="modalStore.closeModal"
              />
            </div>
            <div class="app-modal-footer" v-if="!modalStore.title">
              <button class="app-modal-close-footer" @click="modalStore.closeModal">Закрыть</button>
            </div>
          </div>
        </div>
      </Transition>
    </teleport>
  </ClientOnly>
</template>

<script setup>
import { useModalStore } from '~/stores/modal';

const modalStore = useModalStore();
</script>

<style lang="scss" scoped>
.app-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease;
}

.app-modal-content {
  background: $white-color;
  padding: $spacing-lg;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  min-width: 300px;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.app-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: $text-color;
  }
}

.app-modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
  padding: 0;

  &:hover {
    color: #333;
  }
}

.app-modal-close-footer {
  margin-top: $spacing-md;
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;

  .app-modal-content {
    transform: scale(0.9);
  }
}
</style>
