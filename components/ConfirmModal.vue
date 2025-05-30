<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="cancel">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-actions">
        <button class="button button--danger" @click="confirm">
          {{ confirmText }}
        </button>
        <button class="button button--secondary" @click="cancel">
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Подтвердите действие'
  },
  message: {
    type: String,
    default: 'Вы уверены, что хотите продолжить?'
  },
  confirmText: {
    type: String,
    default: 'Подтвердить'
  },
  cancelText: {
    type: String,
    default: 'Отмена'
  }
});

const isOpen = ref(false);
let resolvePromise;

const open = () => {
  isOpen.value = true;
  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
};

const confirm = () => {
  isOpen.value = false;
  resolvePromise(true);
};

const cancel = () => {
  isOpen.value = false;
  resolvePromise(false);
};


defineExpose({
  open
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: $white-color;
  padding: $spacing-xl;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 90%;
  text-align: center;
  color: $text-color;
}

.modal-title {
  font-size: $font-size-h3;
  color: $danger-color;
  margin-bottom: $spacing-md;
}

.modal-message {
  font-size: $font-size-base;
  margin-bottom: $spacing-xl;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-md;

  .button {
    padding: $spacing-sm $spacing-lg;
    border-radius: 6px;
    font-size: $font-size-md;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;

    &--danger {
      background-color: $danger-color;
      color: $white-color;
      &:hover {
        background-color: darken($danger-color, 10%);
      }
    }

    &--secondary {
      background-color: $secondary-color;
      color: $white-color;
      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
  }
}
</style>