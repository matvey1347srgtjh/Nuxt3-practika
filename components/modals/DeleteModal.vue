<template>
  <div class="modal-content-inner">
    <h3 class="modal-title">{{ dialogStore.modalData.title || 'Подтвердите действие' }}</h3>
    <p
      class="modal-message"
      v-html="dialogStore.modalData.message || 'Вы уверены, что хотите продолжить?'"
    ></p>
    <div class="modal-actions">
      <button class="button button--danger" @click="handleConfirm">
        {{ dialogStore.modalData.confirmText || 'Подтвердить' }}
      </button>
      <button class="button button--secondary" @click="handleCancel">
        {{ dialogStore.modalData.cancelText || 'Отмена' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDialogStore } from '~/stores/dialog';

const dialogStore = useDialogStore();

const onConfirmCallback = dialogStore.modalData.onConfirm;

const handleConfirm = () => {
  if (onConfirmCallback) {
    onConfirmCallback();
  }
  dialogStore.confirmDialog(true);
};

const handleCancel = () => {
  dialogStore.cancelDialog(false);
};
</script>

<style lang="scss" scoped>
.modal-content-inner {
  text-align: center;
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
